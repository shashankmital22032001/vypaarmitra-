# VypaarMitra website

MERN stack: React 19 + Vite (frontend), Express 5 + MongoDB/Mongoose (backend).
Copy, colours, fonts and layout follow *VypaarMitra Website Copy (Paste-Ready)*.

## Setup

1. Install dependencies: `npm run install:all`
2. **Backend:** edit `backend/.env`:
   - `MONGODB_URI`: your MongoDB Atlas connection string (Atlas → Connect → Drivers)
   - `ADMIN_API_KEY`: already generated; keep it secret
3. **Frontend:** edit `frontend/.env`:
   - `VITE_WHATSAPP_NUMBER`: 10-digit number, no +91 (used by every WhatsApp button, the Call link and the schema)
   - Google Analytics ID: set in `src/config/site.js` (`gaId`)

## Develop

Run in two terminals:

```
npm run dev:backend    # API on http://localhost:5000
npm run dev:frontend   # site on http://localhost:5173 (proxies /api to the backend)
```

## Production

```
npm run build          # builds frontend/dist
NODE_ENV=production npm start   # Express serves the API and the built site on one port
```

### Hosting: Hostinger VPS (Ubuntu 24.04)

Nginx (HTTPS, Let's Encrypt) → Node app on port 5000, kept running by PM2. Files in `deploy/`:

| File | Purpose |
| --- | --- |
| `setup.sh` | One-time server setup: packages, Node, PM2, firewall, clone, build, Nginx, HTTPS |
| `update.sh` | Pull from GitHub, rebuild, restart with no downtime |
| `ecosystem.config.cjs` | PM2 settings (production env, port, allowed origins) |
| `nginx.conf` | Reverse proxy; www → non-www; no buffering for the chatbot stream |

**First setup** (from the project folder on your PC, replace `IP` with the VPS IP):

```
scp deploy/setup.sh root@IP:/root/setup.sh
scp backend/.env root@IP:/root/backend.env
scp frontend/.env root@IP:/root/frontend.env
ssh root@IP "bash setup.sh"
```

1. The first run prints a key: add it on GitHub → repo → Settings → Deploy keys (read-only), then run `ssh root@IP "bash setup.sh"` again.
2. MongoDB Atlas → Network Access: add the VPS IP.
3. GoDaddy DNS: `A` record `@` → VPS IP, `CNAME` `www` → `vypaarmitra.com`. Keep the MX/TXT email records.
4. After DNS updates, run `setup.sh` once more to turn on HTTPS.

**Deploy changes:** push to GitHub, then `ssh root@IP "sudo -u vypaar -H bash -lc 'bash ~/app/deploy/update.sh'"`.

**Logs / status:** `ssh root@IP "sudo -u vypaar -H pm2 logs vypaarmitra --lines 50"` (or `pm2 status`).

## API

| Method | Path                  | Auth        | Purpose                                            |
| ------ | --------------------- | ----------- | -------------------------------------------------- |
| GET    | `/api/health`         | none        | Health check (DB status)                           |
| POST   | `/api/leads`          | none        | Free-audit form (validated, rate-limited, honeypot) |
| GET    | `/api/leads`          | `x-api-key` | List leads (`?page=&limit=&status=`)               |
| POST   | `/api/events`         | none        | `audit_cta_click` tracking (package + section)     |
| GET    | `/api/events/summary` | `x-api-key` | Click counts by package and section                |
| POST   | `/api/chat`           | none        | "Mitra" chatbot (streams text; AI if `ANTHROPIC_API_KEY` set) |

Example: `curl -H "x-api-key: <ADMIN_API_KEY>" http://localhost:5000/api/leads`

## Structure

```
backend/src
  config/       env validation (zod), DB connection, constants
  models/       Lead, CtaEvent
  validators/   request schemas
  middleware/   validate, rate limits, API key, errors
  controllers/  lead + event handlers
  routes/
  app.js        express app (helmet, cors, compression, SPA serving)
  server.js     startup + graceful shutdown
frontend/src
  config/site.js     number, links, WhatsApp messages
  data/content.js    all website copy
  components/layout  TopBar, Header, Footer, MobileCtaBar, FloatingWhatsApp
  components/sections one file per homepage section
  components/ui      Button, Logo, Icons
  pages/             Home, PrivacyPolicy, Terms, NotFound
  hooks/ lib/ styles/
```

## Before launch

- Fill in the WhatsApp number and the Atlas connection string.
- Have the Privacy Policy and Terms drafts reviewed.
- Connect GA4 and Search Console; submit `https://vypaarmitra.com/sitemap.xml`.
- Test every WhatsApp button on a phone.
