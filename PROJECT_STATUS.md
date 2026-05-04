# Project Status

## Main project (use this only)
- **Primary GitHub repo:** `lllanaveyyy-art/izabella-nails-clean`
- **Live domain:** `https://izabellanails.vercel.app`
- **Current Vercel strategy:** direct static deployment from `dist` (project: `dist`)

## Working deploy flow
1. `npm install`
2. `npm run build`
3. verify `dist/index.html`
4. `cd dist`
5. `npx vercel deploy --prod --yes --token ${VERCEL_TOKEN} --scope romanpinskyy-4044s-projects`
6. verify deployment URL (`/`, JS, CSS)
7. `npx vercel alias set <deployment-url> izabellanails.vercel.app --token ${VERCEL_TOKEN} --scope romanpinskyy-4044s-projects`

## Do NOT use (legacy)
- **Old repo (do not use):** `lllanaveyyy-art/izavella.nails`
- **Old Vercel projects (do not touch/use):**
  - `izabella-nails-public`
  - `izabella-nails-main`
  - `izabella-nails-main-clean`
  - `github-main-fresh`
  - `izavella-nails`
  - `izavellanails`
  - `dist-static`
  - `deploy-static`
  - `izabella-full-native-live`
  - `izabella-nails-static`
  - `izavella-static`

## Rule for future changes
- Any UI changes must be made **only** via `lllanaveyyy-art/izabella-nails-clean`.
