'use client';

import { useState } from 'react';
import Title, { TitleSize } from '@/components/shared/Title';
import DvLink from '@/components/shared/DvLink';

/* eslint-disable @next/next/no-img-element */

const BASE = '/media-kit';

const BOILERPLATE_SHORT =
  'Data Vallis is a Web3 development company from Maribor, Slovenia, building smart contracts, dApps and decentralized infrastructure for clients and for products of its own.';

const BOILERPLATE_LONG =
  'Data Vallis (DATA VALLIS d.o.o.) is a Web3 development company based in Maribor, Slovenia. For more than a decade the team has been turning complex ideas into working software, and today it focuses on smart contracts, decentralized applications and the infrastructure behind them. Besides client work, Data Vallis designs, launches and runs its own Web3 products: CHERR.IO, a transparent donation platform built on Polygon; PollinationX, a decentralized storage infrastructure layer; W3XShare, encrypted file sharing between wallets; and the PX dApp, a self-custodial decentralized cloud drive.';

type Variant = { file: string; name: string; desc?: string; light?: boolean };

const PRIMARY: Variant = { file: 'datavallis-logo-color', name: 'Primary logo' };

const VARIANTS: Variant[] = [
  { file: 'datavallis-logo-white', name: 'Horizontal · white', desc: 'One-color version for dark photos, videos and dark partner pages.' },
  { file: 'datavallis-logo-black', name: 'Horizontal · black', desc: 'For white documents, print and partner logo walls on light backgrounds.', light: true },
  { file: 'datavallis-logo-color-on-black', name: 'Horizontal · color on black', desc: 'Keeps the full brand colors on light or busy backgrounds.', light: true },
  { file: 'datavallis-logo-no-tagline-color', name: 'Without tagline · color', desc: 'For small sizes, website headers and tight horizontal spaces.' },
  { file: 'datavallis-logo-no-tagline-white', name: 'Without tagline · white', desc: 'Small one-color use on dark backgrounds, e.g. video overlays.' },
  { file: 'datavallis-logo-no-tagline-black', name: 'Without tagline · black', desc: 'Small one-color use on light backgrounds, e.g. footers of documents.', light: true },
  { file: 'datavallis-logo-stacked-color', name: 'Stacked · color', desc: 'For square and vertical formats: posters, roll-ups, social posts.' },
  { file: 'datavallis-logo-stacked-white', name: 'Stacked · white', desc: 'Square formats on dark photos and one-color printing.' },
  { file: 'datavallis-logo-stacked-black', name: 'Stacked · black', desc: 'Square formats on light backgrounds, stamps and engraving.', light: true },
  { file: 'datavallis-logo-stacked-color-on-black', name: 'Stacked · color on black', desc: 'Square color badge for light backgrounds, e.g. sponsor boards.', light: true },
  { file: 'datavallis-icon-color', name: 'Icon · color', desc: 'When the name is already visible nearby, or as a graphic accent.' },
  { file: 'datavallis-icon-white', name: 'Icon · white', desc: 'Watermarks and small one-color marks on dark backgrounds.' },
  { file: 'datavallis-icon-black', name: 'Icon · black', desc: 'Watermarks and small one-color marks on light backgrounds.', light: true },
  { file: 'datavallis-icon-color-on-black', name: 'Icon · color on black', desc: 'Compact color mark for light backgrounds.', light: true },
  { file: 'datavallis-app-icon', name: 'App / avatar icon', desc: 'Social media profile pictures, app icons and favicons.', light: true },
];

const COLORS = [
  { name: 'Vallis Green', hex: '#84D860', rgb: '132, 216, 96', cmyk: '39, 0, 56, 15', use: 'Primary accent - links, highlights, active states' },
  { name: 'Emerald', hex: '#1DB682', rgb: '29, 182, 130', cmyk: '84, 0, 29, 29', use: 'Secondary accent - icon, code highlights' },
  { name: 'Data Yellow', hex: '#FEEF2F', rgb: '254, 239, 47', cmyk: '0, 6, 81, 0', use: '"DATA" in the logotype, small highlights' },
  { name: 'Sand', hex: '#C3AC86', rgb: '195, 172, 134', cmyk: '0, 12, 31, 24', use: '"VALLIS" in the logotype' },
  { name: 'Black', hex: '#000000', rgb: '0, 0, 0', cmyk: '0, 0, 0, 100', use: 'Main background' },
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', use: 'Text on dark' },
];

const FACTS: [string, React.ReactNode][] = [
  ['Company', 'DATA VALLIS d.o.o.'],
  ['Headquarters', 'Maribor, Slovenia'],
  [
    'Founder',
    <span key="f">
      David Tacer -{' '}
      <a href="https://www.linkedin.com/in/davidtacer/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      {' · '}
      <a href="https://x.com/TacerDavid" target="_blank" rel="noopener noreferrer">
        X @TacerDavid
      </a>
    </span>,
  ],
  ['Focus', 'Web3 development - smart contracts, dApps, decentralized infrastructure'],
  ['Own products', 'CHERR.IO, PollinationX, W3XShare, PX dApp'],
  ['Website', <a key="w" href="https://datavallis.com">datavallis.com</a>],
  [
    'Social',
    <span key="s">
      <a href="https://www.linkedin.com/company/data-vallis/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      {' · '}
      <a href="https://x.com/DataVallis" target="_blank" rel="noopener noreferrer">X @DataVallis</a>
    </span>,
  ],
  ['Press contact', <a key="e" href="mailto:info@datavallis.com">info@datavallis.com</a>],
];

/** Exact clear-space diagram: x = one square of the icon (12.13 of 243 logo units) */
function ClearSpaceDiagram() {
  const W = 243;
  const H = 55.88;
  const X = 12.13;
  const L = 26; // room for the left label
  const T = 22; // room for the top label
  const boxW = W + 2 * X;
  const boxH = H + 2 * X;
  const vbW = L + boxW + 4;
  const vbH = T + boxH + 4;
  const sq = { fill: 'rgba(132, 216, 96, 0.28)', stroke: '#84d860', strokeWidth: 0.4 };

  return (
    <svg
      className="clear-space"
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-label="Clear space around the logo equals one square of the icon on every side"
    >
      {/* clear-space boundary */}
      <rect x={L} y={T} width={boxW} height={boxH} fill="none" stroke="#84d860" strokeWidth="0.6" strokeDasharray="2 1.5" />
      {/* logo bounds */}
      <rect x={L + X} y={T + X} width={W} height={H} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" />
      <image href={`${BASE}/logos/datavallis-logo-color.svg`} x={L + X} y={T + X} width={W} height={H} />

      {/* x markers on all four sides */}
      <rect x={L + X} y={T} width={X} height={X} {...sq} />
      <rect x={L + X + W - X} y={T + X + H} width={X} height={X} {...sq} />
      <rect x={L} y={T + X} width={X} height={X} {...sq} />
      <rect x={L + X + W} y={T + X + H - X} width={X} height={X} {...sq} />

      <text x={L + X + X / 2} y={T - 6} textAnchor="middle" className="x-label">
        x
      </text>
      <text x={L - 8} y={T + X + X / 2 + 3} textAnchor="middle" className="x-label">
        x
      </text>
    </svg>
  );
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button type="button" className="copy-button" onClick={copy}>
      {copied ? 'Copied' : label}
    </button>
  );
}

function Downloads({ file }: { file: string }) {
  return (
    <div className="downloads">
      <a href={`${BASE}/logos/${file}.svg`} download>
        SVG
      </a>
      <a href={`${BASE}/png/${file}.png`} download>
        PNG
      </a>
    </div>
  );
}

/**
 * Media kit + brand guidelines (CGP)
 */
export default function MediaKitPage() {
  return (
    <div className="dv-media-kit">
      <Title title="Our brand, <br> your toolkit." size={TitleSize.H3}>
        <div className="mk-intro">
          <p className="h6">Logos, colors, typography and the facts you need to write about Data Vallis.</p>
          <a className="cta-primary" href={`${BASE}/datavallis-media-kit.zip`} download>
            Download media kit (ZIP)
          </a>
        </div>
      </Title>

      {/* ---------- About ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">About Data Vallis</h2>

        <div className="mk-grid">
          <div className="boilerplate">
            <div className="label">
              Short description <CopyButton text={BOILERPLATE_SHORT} />
            </div>
            <p>{BOILERPLATE_SHORT}</p>

            <div className="label">
              Long description <CopyButton text={BOILERPLATE_LONG} />
            </div>
            <p>{BOILERPLATE_LONG}</p>
          </div>

          <dl className="facts">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="line"></div>

      {/* ---------- Logo ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">Logo</h2>
        <p className="mk-lead">
          The logo combines the icon - data blocks rising like the hills of a valley, in the shape of Slovenia - with
          the DATA VALLIS logotype and the tagline Dream · Desire · Develop. Use the files below and never redraw or
          rebuild the logo.
        </p>

        <div className="logo-primary">
          <img src={`${BASE}/logos/${PRIMARY.file}.svg`} alt="Data Vallis logo" />
          <div className="logo-primary-meta">
            <span>{PRIMARY.name} · the default version, for black and dark backgrounds</span>
            <Downloads file={PRIMARY.file} />
          </div>
        </div>

        <h3 className="h6 mk-subtitle">Variations</h3>
        <div className="logo-grid">
          {VARIANTS.map((v) => (
            <div className={`logo-card${v.light ? ' light' : ''}`} key={v.file}>
              <div className="logo-preview">
                <img src={`${BASE}/logos/${v.file}.svg`} alt={`Data Vallis ${v.name}`} />
              </div>
              <div className="logo-meta">
                <span>{v.name}</span>
                <Downloads file={v.file} />
              </div>
              {v.desc && <p className="logo-desc">{v.desc}</p>}
            </div>
          ))}
        </div>

        <div className="mk-grid rules">
          <div>
            <h3 className="h6 mk-subtitle">Which version to use</h3>
            <ul className="mk-list">
              <li>
                <strong>Color</strong> - the default, on black or very dark backgrounds.
              </li>
              <li>
                <strong>Color on black</strong> - when the background is light or busy (documents, partner pages).
              </li>
              <li>
                <strong>White / black</strong> - one-color printing, engraving, photos and partner logo walls.
              </li>
              <li>
                <strong>Without tagline</strong> - small sizes and tight horizontal spaces.
              </li>
              <li>
                <strong>Stacked</strong> - square or vertical formats.
              </li>
              <li>
                <strong>Icon / app icon</strong> - favicon, social avatars, app icons.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="h6 mk-subtitle">Clear space & minimum size</h3>
            <ClearSpaceDiagram />
            <ul className="mk-list">
              <li>
                Keep free space of at least <strong>x</strong> around the logo - x is the size of one square of the
                icon.
              </li>
              <li>Horizontal logo: at least 120 px / 30 mm wide.</li>
              <li>Below 160 px / 40 mm use the version without tagline.</li>
              <li>Icon: at least 24 px / 6 mm.</li>
            </ul>
          </div>
        </div>

        <h3 className="h6 mk-subtitle">Please don&apos;t</h3>
        <ul className="donts">
          <li>stretch, squeeze or rotate the logo</li>
          <li>change the colors or swap DATA and VALLIS colors</li>
          <li>move, remove or add squares to the icon</li>
          <li>add shadows, outlines, gradients or other effects</li>
          <li>place the color logo on light or busy backgrounds</li>
          <li>retype the logotype in another font</li>
        </ul>
      </section>

      <div className="line"></div>

      {/* ---------- Usage examples ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">Usage examples</h2>
        <p className="mk-lead">
          How the logo variations work in real life. Pick the version by the background and the space you have - the
          examples show the most common cases.
        </p>

        <div className="example-grid">
          <figure className="example wide">
            <div className="ex-website">
              <div className="ex-browser-bar">
                <span></span>
                <span></span>
                <span></span>
                <div className="ex-tab">
                  <img src={`${BASE}/logos/datavallis-app-icon.svg`} alt="" />
                  Data Vallis
                </div>
              </div>
              <div className="ex-site">
                <div className="ex-site-header">
                  <img src={`${BASE}/logos/datavallis-logo-no-tagline-color.svg`} alt="" />
                  <div className="ex-nav">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
                <div className="ex-site-title">We build Web3 products.</div>
              </div>
            </div>
            <figcaption>
              <strong>Website & favicon</strong>Logo without tagline in the header, app icon as the favicon.
            </figcaption>
          </figure>

          <figure className="example">
            <div className="ex-social">
              <div className="ex-social-banner">
                <img src={`${BASE}/logos/datavallis-logo-color.svg`} alt="" />
              </div>
              <div className="ex-social-avatar">
                <img src={`${BASE}/logos/datavallis-app-icon.svg`} alt="" />
              </div>
              <div className="ex-social-name">
                Data Vallis
                <span>@DataVallis</span>
              </div>
            </div>
            <figcaption>
              <strong>Social profiles</strong>App icon as the profile picture, primary logo on the banner.
            </figcaption>
          </figure>

          <figure className="example tall">
            <div className="ex-cards">
              <img
                src={`${BASE}/examples/business-cards.jpg`}
                alt="Data Vallis business cards: logo on the front; name, company, contact and icon on the back"
                loading="lazy"
              />
            </div>
            <figcaption>
              <strong>Business cards</strong>Dark grey premium paper with foil print on both sides: the logo on the
              front; name, company, contact and the icon on the back. 89 × 54 mm.
            </figcaption>
          </figure>

          <figure className="example">
            <div className="ex-slide">
              <div className="ex-slide-title">Smart contracts, dApps & infrastructure</div>
              <img src={`${BASE}/logos/datavallis-logo-no-tagline-color.svg`} alt="" />
            </div>
            <figcaption>
              <strong>Presentations</strong>Black slides, Matchbook titles, small logo without tagline in the corner.
            </figcaption>
          </figure>

          <figure className="example">
            <div className="ex-wall">
              <div className="ex-wall-title">Partners</div>
              <div className="ex-wall-grid">
                <div className="ex-partner"></div>
                <div className="ex-partner dv">
                  <img src={`${BASE}/logos/datavallis-logo-black.svg`} alt="" />
                </div>
                <div className="ex-partner"></div>
                <div className="ex-partner"></div>
                <div className="ex-partner"></div>
                <div className="ex-partner"></div>
              </div>
            </div>
            <figcaption>
              <strong>Partner & sponsor walls</strong>On light backgrounds use the black logo, so it sits evenly
              with other logos.
            </figcaption>
          </figure>

          <figure className="example">
            <div className="ex-doc">
              <div className="ex-doc-head">
                <img src={`${BASE}/logos/datavallis-logo-black.svg`} alt="" />
              </div>
              <div className="ex-doc-lines">
                <i></i>
                <i></i>
                <i className="short"></i>
                <i></i>
                <i className="short"></i>
              </div>
            </div>
            <figcaption>
              <strong>Documents & offers</strong>Black logo on white paper, or color on black for a cover page.
            </figcaption>
          </figure>

          <figure className="example">
            <div className="ex-poster">
              <img src={`${BASE}/logos/datavallis-logo-stacked-color.svg`} alt="" />
              <div className="ex-poster-valley">
                <img src="/assets/images/bg-exact.webp" alt="" />
              </div>
            </div>
            <figcaption>
              <strong>Posters & roll-ups</strong>Stacked logo for vertical formats, the valley at the bottom.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="line"></div>

      {/* ---------- Colors ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">Colors</h2>
        <p className="mk-lead">
          Black is our canvas. Green and emerald carry the brand, yellow and sand appear mainly in the logotype. Use
          accents sparingly, so they stand out.
        </p>

        <div className="color-grid">
          {COLORS.map((c) => (
            <div className="color-card" key={c.hex}>
              <div className="swatch" style={{ backgroundColor: c.hex }}></div>
              <div className="color-meta">
                <div className="color-name">{c.name}</div>
                <div className="color-values mono">
                  <span>
                    HEX {c.hex} <CopyButton text={c.hex} />
                  </span>
                  <span>RGB {c.rgb}</span>
                  <span>CMYK {c.cmyk}</span>
                </div>
                <div className="color-use">{c.use}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mk-note">CMYK values are approximations - ask your printer for a proof.</p>
      </section>

      <div className="line"></div>

      {/* ---------- Typography ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">Typography</h2>

        <div className="type-grid">
          <div className="type-card">
            <div className="type-specimen matchbook">Aa</div>
            <div className="type-name">Matchbook</div>
            <p>Display font for big titles and section headlines. Tall, condensed and set large.</p>
            <div className="type-sample matchbook">Explore our data valley</div>
          </div>
          <div className="type-card">
            <div className="type-specimen proxima">Aa</div>
            <div className="type-name">Proxima Nova</div>
            <p>Body text, navigation and UI. Generous letter spacing, uppercase for labels.</p>
            <div className="type-sample proxima">SMART CONTRACTS · DAPPS · INFRASTRUCTURE</div>
          </div>
          <div className="type-card">
            <div className="type-specimen mono">Aa</div>
            <div className="type-name">Space Mono</div>
            <p>Accents with a developer feel - code snippets, data and small details.</p>
            <div className="type-sample mono">{'{ "status": "VALID" }'}</div>
          </div>
        </div>
        <p className="mk-note">
          Fonts are licensed separately and are not part of the media kit. Space Mono is free on Google Fonts.
        </p>
      </section>

      <div className="line"></div>

      {/* ---------- Visual language ---------- */}
      <section className="mk-section content">
        <h2 className="h4 green-f">Visual language & voice</h2>

        <div className="mk-grid">
          <div>
            <div className="visual-valley">
              <img src="/assets/images/bg-exact.webp" alt="" />
            </div>
            <ul className="mk-list">
              <li>
                <strong>The valley</strong> - the wireframe landscape is our signature visual. Use it full-width, at
                the bottom, on black.
              </li>
              <li>
                <strong>Outlined titles</strong> - big, outlined Matchbook words as decorative section labels.
              </li>
              <li>
                <strong>Lots of black space</strong> - few elements, large type, thin white lines as dividers.
              </li>
            </ul>
          </div>

          <div>
            <div className="outlined-sample">valley</div>
            <h3 className="h6 mk-subtitle">How we sound</h3>
            <ul className="mk-list">
              <li>
                <strong>Playful headline, precise body.</strong> &ldquo;Not to brag, but we know a lot about this
                stuff&rdquo; - followed by clear, concrete facts.
              </li>
              <li>
                <strong>Plain words over buzzwords.</strong> Say what we build and why it matters.
              </li>
              <li>
                <strong>Confident, never arrogant.</strong> We show our own products instead of big promises.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="line"></div>

      <section className="mk-section content mk-contact">
        <div className="h6">Need something that isn&apos;t here?</div>
        <DvLink external="mailto:info@datavallis.com" textKey="info@datavallis.com" open />
      </section>
    </div>
  );
}
