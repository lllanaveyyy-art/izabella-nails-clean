import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const indexPath = join(process.cwd(), 'dist', 'index.html');
if (!existsSync(indexPath)) throw new Error('dist/index.html missing');
const html = readFileSync(indexPath, 'utf8');
if (html.includes('$_TSR')) throw new Error('window.$_TSR found');
const js = html.match(/src="([^"]+\.js)"/)?.[1];
const css = html.match(/href="([^"]+\.css)"/)?.[1];
if (!js || !css) throw new Error('missing js/css refs');
for (const f of [js, css]) {
  if (!existsSync(join(process.cwd(),'dist',f.replace(/^\//,'')))) throw new Error(`missing ${f}`);
}
console.log(`OK JS=${js} CSS=${css}`);
