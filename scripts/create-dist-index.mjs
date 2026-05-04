import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const clientDir = join(process.cwd(), 'dist', 'client');
const assetsDir = join(clientDir, 'assets');
const outputDir = join(process.cwd(), 'dist');

if (!existsSync(assetsDir)) {
  console.error('Missing dist/client/assets after build');
  process.exit(1);
}

const assets = readdirSync(assetsDir);
const css = assets.find((name) => /^styles-.*\.css$/.test(name));

const jsCandidates = assets.filter((name) => /^index-.*\.js$/.test(name));
const js = jsCandidates
  .map((name) => ({ name, content: readFileSync(join(assetsDir, name), 'utf8') }))
  .find((entry) => entry.content.includes('hydrateRoot') || entry.content.includes('startTransition'))?.name
  ?? jsCandidates.sort((a, b) => statSync(join(assetsDir, b)).size - statSync(join(assetsDir, a)).size)[0];

if (!css || !js) {
  console.error('Could not locate client entry assets in dist/client/assets');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/client/assets/${css}" />
    <title>Izabella Nails</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/client/assets/${js}"></script>
  </body>
</html>
`;

writeFileSync(join(outputDir, 'index.html'), html, 'utf8');
console.log('Generated dist/index.html');
