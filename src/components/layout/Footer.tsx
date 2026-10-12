'use client';

import { useT } from '@/lib/i18n-client';
import TLink from '@/components/shared/TLink';

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <div className="dv-footer">
      <footer className="content flex">
        <div className="main">
          <img src="/assets/images/logo.svg" className="logo" alt="Datavallis logo" />
          <br />
          Maribor, Slovenia
        </div>

        <ul>
          <li>
            <TLink href="/" fragment="about">
              {t('menu.about')}
            </TLink>
          </li>
          <li>
            <TLink href="/" fragment="services">
              {t('menu.services')}
            </TLink>
          </li>
          <li>
            <TLink href="/" fragment="products">
              {t('menu.products')}
            </TLink>
          </li>
        </ul>

        <ul>
          <li>
            <TLink href="/experience">{t('menu.experience')}</TLink>
          </li>
          <li>
            <TLink href="/our-company">{t('menu.team')}</TLink>
          </li>
        </ul>

        <ul>
          <li>
            <TLink href="/careers">{t('menu.careers')}</TLink>
          </li>
          <li>
            <TLink href="/contact" className="uppercase">
              {t('menu.cta.contact')}
            </TLink>
          </li>
          <li className="social">
            <a href="https://www.linkedin.com/company/data-vallis/mycompany/" target="_blank">
              <img className="pointer icon" src="/assets/icons/linkedin.svg" alt="linkeid icon" />
            </a>
            <a href="https://www.facebook.com/data.vallis" target="_blank">
              <img className="pointer icon" src="/assets/icons/facebook.svg" alt="facebook icon" />
            </a>
            <a href="https://twitter.com/DataVallis" target="_blank">
              <img className="pointer icon" src="/assets/icons/twitter.png" alt="linkedin icon" />
            </a>
          </li>
        </ul>
      </footer>

      <div className="copyright content">
        Copyright © {year} Data Vallis
        <strong>|</strong>
        <TLink href="/privacy-policy">{t('menu.privacyPolicy')}</TLink>
        <strong>|</strong>
        <TLink href="/legal-notice">{t('menu.legalNotice')}</TLink>
      </div>
    </div>
  );
}
