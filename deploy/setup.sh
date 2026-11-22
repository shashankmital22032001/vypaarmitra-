#!/usr/bin/env bash
# One-time setup of a fresh Hostinger VPS (Ubuntu 24.04). Safe to run again.
# Upload this file and both .env files to /root first (see README), then as root:  bash setup.sh
set -euo pipefail

DOMAIN=vypaarmitra.com
CERT_EMAIL=s.mital@vypaarmitra.com
REPO=git@github.com:shashankmital22032001/vypaarmitra-.git
APP_USER=vypaar
HOME_DIR=/home/$APP_USER
APP_DIR=$HOME_DIR/app
NODE_MAJOR=24

[ "$(id -u)" -eq 0 ] || { echo "Please run as root."; exit 1; }
as_app() { sudo -u "$APP_USER" -H bash -lc "$*"; }

echo "==> System packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw fail2ban unattended-upgrades

echo "==> Node.js $NODE_MAJOR and PM2"
if ! node -v 2>/dev/null | grep -q "^v$NODE_MAJOR\."; then
  curl -fsSL "https://deb.nodesource.com/setup_$NODE_MAJOR.x" | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2

echo "==> Firewall (SSH, HTTP, HTTPS only)"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> App user and GitHub access"
id "$APP_USER" &>/dev/null || adduser --disabled-password --gecos "" "$APP_USER"
KEY=$HOME_DIR/.ssh/id_ed25519
if [ ! -f "$KEY" ]; then
  as_app "mkdir -p ~/.ssh && chmod 700 ~/.ssh && ssh-keygen -t ed25519 -N '' -f ~/.ssh/id_ed25519 -C vypaarmitra-vps -q"
  as_app "ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts 2>/dev/null"
fi

if [ ! -d "$APP_DIR/.git" ]; then
  if ! as_app "git ls-remote $REPO" &>/dev/null; then
    echo
    echo "------------------------------------------------------------------"
    echo "GitHub needs this server's key. On GitHub open the repository >"
    echo "Settings > Deploy keys > Add deploy key, paste this (leave"
    echo "'Allow write access' unticked), save, then run: bash setup.sh"
    echo
    cat "$KEY.pub"
    echo "------------------------------------------------------------------"
    exit 0
  fi
  as_app "git clone $REPO $APP_DIR"
fi

echo "==> Secrets (.env files)"
for part in backend frontend; do
  if [ -f "/root/$part.env" ]; then
    install -o "$APP_USER" -g "$APP_USER" -m 600 "/root/$part.env" "$APP_DIR/$part/.env"
    rm -f "/root/$part.env"
  fi
  [ -f "$APP_DIR/$part/.env" ] || { echo "Missing $part .env: upload it to /root/$part.env and run again."; exit 1; }
done

echo "==> Build and start the site"
as_app "bash $APP_DIR/deploy/update.sh"
as_app "pm2 describe pm2-logrotate >/dev/null 2>&1 || pm2 install pm2-logrotate"
pm2 startup systemd -u "$APP_USER" --hp "$HOME_DIR" >/dev/null
as_app "pm2 save"

echo "==> Nginx"
# Copied only once: certbot later adds the HTTPS settings to this file.
[ -f /etc/nginx/sites-available/vypaarmitra ] || cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/vypaarmitra
ln -sf /etc/nginx/sites-available/vypaarmitra /etc/nginx/sites-enabled/vypaarmitra
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> HTTPS certificate"
if certbot certificates 2>/dev/null | grep -q "Domains: $DOMAIN"; then
  echo "Certificate already installed."
elif certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --agree-tos -m "$CERT_EMAIL" --non-interactive; then
  echo "HTTPS is on."
else
  echo
  echo "HTTPS not set up yet: the domain doesn't point to this server."
  echo "Update the GoDaddy DNS records, wait 10-30 minutes, then run: bash setup.sh"
fi

echo
echo "Done. Health check: $(curl -s http://127.0.0.1:5000/api/health || echo 'not responding')"
