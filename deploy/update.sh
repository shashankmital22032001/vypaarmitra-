#!/usr/bin/env bash
# Pull the latest code from GitHub, rebuild the site and restart it with no downtime.
# On the server, as the app user:  bash ~/app/deploy/update.sh
set -euo pipefail
cd "$(dirname "$0")/.."

git pull --ff-only
npm ci --prefix backend --omit=dev
npm ci --prefix frontend --include=dev
npm run build --prefix frontend
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "Deployed $(git log -1 --format='%h %s')"
