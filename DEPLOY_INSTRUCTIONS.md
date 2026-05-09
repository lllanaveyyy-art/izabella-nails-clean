# Deploy Instructions (Working Path)

Current reliable production deploy path is **direct static deploy from `dist/`**.

## Steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build and smoke-check the static output:
   ```bash
   npm run build
   npm run smoke:dist
   ```
3. Deploy static output to Vercel (no gitSource flow):
   ```bash
   npm run deploy:prod -- --token ${VERCEL_TOKEN}
   ```

   This script builds `dist/`, verifies `dist/index.html`, then runs `npx vercel deploy --prod` from inside `dist/`.
4. If deployment is protected by SSO (401), disable protection for the created Vercel project/deployment via Vercel API, then re-check deployment URL.
5. Switch live alias only after deployment is confirmed healthy:
   ```bash
   npx vercel alias set <deployment-url> izabellanails.vercel.app --token ${VERCEL_TOKEN} --scope romanpinskyy-4044s-projects
   ```
6. Verify live:
   ```bash
   curl -I https://izabellanails.vercel.app/
   ```

## Rules

- **Do NOT use old Vercel `gitSource` deployments** for this project path.
- **Do NOT switch alias if the new deployment is not `200` on `/`.**
- Live domain is currently running via **direct `dist` deploy**. A Git commit/PR by itself does not update the public site until the freshly built `dist/` folder is deployed and aliased.
