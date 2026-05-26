# Deployment guide (Cloudways / sftrainings.org)

## `.env.local` is required (not in Git)

The repo **does not include** `.env.local` on purpose (it is in `.gitignore`).

Your deployer must create it on the server **before** `npm run build`.

### Quick setup

```bash
cd iso14001-2026
git lfs install && git lfs pull
cp env.deploy.example .env.local
npm install
npm run build
npm start
```

Or set the same variables in **Cloudways → Application → Environment Variables**, then build.

### Required variables

| Variable | Value (sftrainings subfolder) |
|----------|-------------------------------|
| `NEXT_PUBLIC_BASE_PATH` | `/iso-14001-2026-transition` |
| `N8N_LEAD_WEBHOOK_URL` | `https://damnart-ai-guladab.n8n-wsk.com/webhook/iso14001-lead` |
| `NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL` | same as above (form fallback) |
| `NODE_ENV` | `production` |

If the app is at the **domain root** (no subfolder), remove `NEXT_PUBLIC_BASE_PATH`.

### Cloudways checklist

1. Node.js **20** application  
2. Clone repo + `git lfs pull`  
3. Create `.env.local` from `env.deploy.example`  
4. `npm run build` then `npm start` (do not use static-only hosting)  
5. Proxy `https://sftrainings.org/iso-14001-2026-transition/` to the Node port  
6. Test: Register form → Network → POST to `.../iso-14001-2026-transition/api/lead` → 200  

### Local development

```bash
cp .env.example .env.local
# Leave NEXT_PUBLIC_BASE_PATH unset for http://localhost:3000
npm run dev
```
