// Generates 1200x630 Open Graph images into public/og/ using the site's fonts and assets.
// Usage: node scripts/make_og.js   (requires playwright with a Chromium build)
const path = require('path');
const fs = require('fs');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/npm-tools/node_modules/playwright'));
}

const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const OUT = path.join(PUB, 'og');
const url = (p) => 'file://' + path.join(PUB, p);

const IMAGES = [
  { file: 'default', title: 'We build<br>Web3 products.', sub: 'Smart contracts · dApps · decentralized infrastructure' },
  { file: 'experience', title: 'Blockchain<br>in practice', sub: 'Industry experience: charity, telecommunications, manufacturing, finance' },
  { file: 'experience-charity', title: 'Charity<br>& blockchain', sub: 'Transparent giving with smart-contract escrow · CHERR.IO' },
  { file: 'experience-telecommunications', title: 'Telecom<br>& blockchain', sub: 'SMS billing, subscriptions and fraud prevention with smart contracts' },
  { file: 'experience-manufacturing', title: 'Manufacturing<br>& blockchain', sub: 'Supply chain transparency, provenance and asset tracking' },
  { file: 'experience-finance', title: 'Finance<br>& blockchain', sub: 'Smart contracts for invoicing, payments and digital assets' },
  { file: 'our-company', title: 'About<br>Data Vallis', sub: 'Web3 development company from Maribor, Slovenia' },
  { file: 'careers', title: 'Build Web3<br>with us', sub: 'Send us an open application' },
  { file: 'contact', title: "Let's talk", sub: 'Have a Web3 idea? Get in touch with Data Vallis' },
  { file: 'media-kit', title: 'Media kit &<br>brand guidelines', sub: 'Logos, colors, typography and company facts' },
];

const html = ({ title, sub }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'matchbook'; src: url('${url('assets/fonts/matchbook-webfont.woff')}') format('woff'); }
@font-face { font-family: 'proxima'; src: url('${url('assets/fonts/proxima_nova_font-webfont.woff')}') format('woff'); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #000; color: #fff; position: relative; overflow: hidden; font-family: 'proxima'; }
.valley { position: absolute; left: -10%; bottom: -60px; width: 120%; opacity: .55; }
.shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.95) 0%, rgba(0,0,0,.75) 55%, rgba(0,0,0,.2) 100%); }
.logo { position: absolute; left: 72px; top: 64px; width: 300px; }
h1 { position: absolute; left: 72px; top: 170px; font-family: 'matchbook'; font-weight: normal; font-size: 132px; line-height: 128px; letter-spacing: 1px; }
p { position: absolute; left: 76px; bottom: 74px; font-size: 28px; letter-spacing: 1.2px; color: #84d860; max-width: 900px; }
.url { position: absolute; right: 72px; top: 80px; font-size: 22px; letter-spacing: 3px; text-transform: uppercase; opacity: .8; }
</style></head><body>
<img class="valley" src="${url('assets/images/bg-exact.webp')}">
<div class="shade"></div>
<img class="logo" src="${url('media-kit/logos/datavallis-logo-color.svg')}">
<div class="url">datavallis.com</div>
<h1>${title}</h1>
<p>${sub}</p>
</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const tmp = path.join(OUT, '.og.html');

  for (const img of IMAGES) {
    fs.writeFileSync(tmp, html(img));
    await page.goto('file://' + tmp);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, img.file + '.jpg'), type: 'jpeg', quality: 90 });
  }

  fs.unlinkSync(tmp);
  await browser.close();
  console.log(IMAGES.length, 'images');
})();
