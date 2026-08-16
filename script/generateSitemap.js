import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = 'https://eliterealestate.com';

const routes = [
  '/',
  '/buy',
  '/rent',
  '/commercial',
  '/luxury',
  '/agents',
  '/about',
  '/blog',
  '/contact',
  '/faq',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
  </url>
`
  )
  .join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated!');
