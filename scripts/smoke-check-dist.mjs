import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
if (!existsSync(indexPath)) throw new Error('dist/index.html missing');

const html = readFileSync(indexPath, 'utf8');
const js = html.match(/src="([^"]+\.js)"/)?.[1];
const css = html.match(/href="([^"]+\.css)"/)?.[1];
if (!js || !css) throw new Error('dist/index.html missing js/css links');

const jsPath = join(distDir, js.replace(/^\//, ''));
const cssPath = join(distDir, css.replace(/^\//, ''));
if (!existsSync(jsPath)) throw new Error(`Missing JS asset: ${js}`);
if (!existsSync(cssPath)) throw new Error(`Missing CSS asset: ${css}`);

const jsContent = readFileSync(jsPath, 'utf8');
if (!jsContent.includes('hydrateRoot')) {
  throw new Error(`Selected JS is not bootstrap entry (no hydrateRoot): ${js}`);
}

console.log(`OK JS=${js} CSS=${css}`);
