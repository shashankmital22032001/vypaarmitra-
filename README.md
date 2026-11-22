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
   - `VITE_GA_ID`: GA4 measurement ID (optional)

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

Set `NODE_ENV=production` and `CORS_ORIGINS=https://vypaarmitra.com` in the host's environment.

### Deploy on Render

`render.yaml` defines one web service (Starter plan) that builds the frontend and runs the API.
Render → New → Blueprint → select the GitHub repo, then paste the secret values from `backend/.env`
and `frontend/.env` when asked. Add `vypaarmitra.com` under Settings → Custom Domains and create the
DNS records Render shows at GoDaddy (keep the MX/TXT email records untouched).
In MongoDB Atlas → Network Access, allow `0.0.0.0/0` (Render has no fixed outbound IP).

## API

| Method | Path                  | Auth        | Purpose                                            |
| ------ | --------------------- | ----------- | -------------------------------------------------- |
| GET    | `/api/health`         | none        | Health check (DB status)                           |
| POST   | `/api/leads`          | none        | Free-audit form (validated, rate-limited, honeypot) |
| GET    | `/api/leads`          | `x-api-key` | List leads (`?page=&limit=&status=`)               |
| POST   | `/api/events`         | none        | `audit_cta_click` tracking (package + section)     |
| GET    | `/api/events/summary` | `x-api-key` | Click counts by package and section                |

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
- Set up the www → non-www and HTTP → HTTPS redirects at your host or DNS.
- Test every WhatsApp button on a phone.
