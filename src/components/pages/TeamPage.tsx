'use client';

import { useT } from '@/lib/i18n-client';
import Title, { TitleSize } from '@/components/shared/Title';

/* eslint-disable @next/next/no-img-element */
function Meaning() {
  const t = useT();

  return (
    <div className="dv-meaning">
      <div className="content flex meaning">
        <div className="item">
          <div className="img-wrapper">
            <img src="/assets/images/slovenia.svg" className="img-slovenia" alt="slovenia" />
          </div>

          <div className="h6">{t('team.meaning.slovenia.title')}</div>
          {t('team.meaning.slovenia.text')}
        </div>
        <div className="item">
          <div className="img-wrapper">
            <img src="/assets/images/colors.svg" className="img-colors" alt="colors" />
          </div>

          <div className="h6">{t('team.meaning.colors.title')}</div>
          {t('team.meaning.colors.text')}
        </div>
        <div className="item">
          <div className="img-wrapper">
            <img src="/assets/images/data.svg" className="img-text" alt="data" />
          </div>

          <div className="h6">{t('team.meaning.data.title')}</div>
          {t('team.meaning.data.text')}
        </div>
        <div className="item">
          <div className="img-wrapper">
            <img src="/assets/images/vallis.svg" className="img-text" alt="valis" />
          </div>

          <div className="h6">{t('team.meaning.valley.title')}</div>
          {t('team.meaning.valley.text')}
        </div>
      </div>
    </div>
  );
}

function Values() {
  return (
    <div className="dv-values">
      <div className="content">
        <div className="flex">
          <div className="item">
            <div className="h4 green-f">Vision</div>
            <p>
              We want to become the first choice of companies in providing digital transformation. By developing our own
              advanced and adaptable ERP systems and using the latest technologies, such as blockchain, we are a reliable
              partner in the digital transformation of all economic sectors and public institutions.
            </p>
          </div>

          <div className="item">
            <div className="h4 green-f">Mission</div>
            <p>
              We co-create the progress of companies with innovative digital solutions that are adapted to the needs and
              challenges of modern society.
            </p>
          </div>
        </div>

        <div className="item">
          <div className="h4 green-f">Values</div>

          <div className="h6">Responsibility and diligence</div>
          <p>
            We believe in the importance of good business relationships, so we build trust on kindness, honest
            cooperation and respect for agreements. We are diligent and economical in our work. We care about our
            employees, users and wider social and natural environment.
          </p>

          <div className="h6">Development orientation and perfection</div>
          <p>
            By focusing on solutions, we are committed to constantly inspiring our users. With our self-initiative and
            innovative ideas, we create progress for the wider society. We invest ambitiously in the development of
            people and equipment because we want to be the best at what we do. Our quality is reflected in the
            satisfaction of our employees and users.
          </p>

          <div className="h6">Agility and freedom</div>
          <p>
            With our openness and broad mindset, we adapt quickly to changes in the environment. In our work we are
            guided by freedom and easiness, as well as by belonging and responsibility within teams.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Port of TeamPageComponent (/our-company). The employees section is commented out in the original.
 */
export default function TeamPage() {
  const t = useT();

  return (
    <>
      <Title title={t('team.title')} size={TitleSize.H3} />

      <Meaning />
      <div className="line"></div>
      <Values />
      <div className="line"></div>
    </>
  );
}
