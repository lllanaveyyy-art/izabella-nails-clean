# Deploy Instructions (Working Path)

Current reliable production deploy path is **direct static deploy from `dist/`**.

## Steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build:
   ```bash
   npm run build
   ```
3. Verify build output entry exists:
   ```bash
   test -f dist/index.html
   ```
4. Enter build output directory:
   ```bash
   cd dist
   ```
5. Deploy static output to Vercel (no gitSource flow):
   ```bash
   npx vercel deploy --prod --yes --token ${VERCEL_TOKEN} --scope romanpinskyy-4044s-projects
   ```
6. If deployment is protected by SSO (401), disable protection for the created Vercel project/deployment via Vercel API, then re-check deployment URL.
7. Switch live alias only after deployment is confirmed healthy:
   ```bash
   npx vercel alias set <deployment-url> izabellanails.vercel.app --token ${VERCEL_TOKEN} --scope romanpinskyy-4044s-projects
   ```
8. Verify live:
   ```bash
   curl -I https://izabellanails.vercel.app/
   ```

## Rules

- **Do NOT use old Vercel `gitSource` deployments** for this project path.
- **Do NOT switch alias if the new deployment is not `200` on `/`.**
- Live domain is currently running via **direct `dist` deploy**.
