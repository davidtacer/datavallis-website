'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n-client';
import { submitContactForm } from '@/lib/api';
import Title, { TitleSize } from '@/components/shared/Title';
import DvLink from '@/components/shared/DvLink';
import TLink from '@/components/shared/TLink';

enum FormStatus {
  Default = 0,
  Loading = 1,
  Submitted = 2,
}

type FieldName = 'first_name' | 'email' | 'company' | 'message';
type FormValue = Record<FieldName, string | null>;

const EMPTY: FormValue = { first_name: '', email: '', company: '', message: '' };

// Angular's Validators.email regex
const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmpty = (v: string | null) => v == null || v.length === 0;

function validate(value: FormValue) {
  const email: { required?: true; email?: true } = {};

  if (isEmpty(value.email)) {
    email.required = true;
  } else if (!EMAIL_REGEXP.test(value.email as string)) {
    email.email = true;
  }

  const message: { required?: true } = isEmpty(value.message) ? { required: true } : {};

  return {
    email: Object.keys(email).length ? email : null,
    message: Object.keys(message).length ? message : null,
  };
}

/**
 * Port of ContactPageComponent (reactive form + live "JSON" preview)
 */
export default function ContactPage() {
  const t = useT();

  const [value, setValue] = useState<FormValue>(EMPTY);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    first_name: false,
    email: false,
    company: false,
    message: false,
  });
  const [agreedToPrivacy, setAgreedToPrivacy] = useState<boolean | undefined>(undefined);
  const [status, setStatus] = useState<FormStatus>(FormStatus.Default);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
  }, []);

  const errors = validate(value);
  const formStatus = errors.email || errors.message ? 'INVALID' : 'VALID';

  const onChange = (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue((v) => ({ ...v, [name]: e.target.value }));

  const onBlur = (name: FieldName) => () => setTouched((v) => ({ ...v, [name]: true }));

  const display = (v: string | null) => (v == null ? '' : v);

  const submit = () => {
    setTouched({ first_name: true, email: true, company: true, message: true });

    if (formStatus === 'INVALID' || !agreedToPrivacy) {
      if (agreedToPrivacy === undefined) {
        setAgreedToPrivacy(false);
      }

      return;
    }

    setStatus(FormStatus.Loading);

    submitContactForm({ ...value, contact_type_id: 2 })
      .then(() => {
        setStatus(FormStatus.Submitted);

        resetTimeout.current = setTimeout(() => {
          setStatus(FormStatus.Default);
          // FormGroup.reset() -> values become null, controls untouched
          setValue({ first_name: null, email: null, company: null, message: null });
          setTouched({ first_name: false, email: false, company: false, message: false });
        }, 5000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dv-contact-page">
      <Title title={t('contact.title')} size={TitleSize.H3}>
        <div className="mobile h6">{t('contact.text')}</div>
      </Title>

      <div className="content flex flex-m">
        <div className="left-side">
          <div className="desktop h6">{t('contact.text')}</div>

          <div className="direct-contact">
            <span>{t('contact.emailLabel')}</span>{' '}
            <a href="mailto:info@datavallis.com">info@datavallis.com</a>
          </div>

          <div className="mock-code mono">
            {' { '}
            <div className="property">
              <label>&quot;email&quot;:</label>
              <label className="yellow">&quot;{display(value.email)}&quot;</label>
              {', '}
            </div>
            <div className="property">
              <label>&quot;name&quot;:</label>
              <label className="yellow">&quot;{display(value.first_name)}&quot;</label>
              {', '}
            </div>
            <div className="property">
              <label>&quot;company&quot;:</label>
              <label className="yellow">&quot;{display(value.company)}&quot;</label>
              {', '}
            </div>
            <div className="property flex">
              <label>&quot;message&quot;:</label>
              <label className="yellow">&quot;{display(value.message)}&quot;</label>
              {', '}
            </div>
            <div className="property">
              <label>&quot;status&quot;:</label>
              <label className={formStatus === 'INVALID' ? 'red' : 'green'}>&quot;{formStatus}&quot;</label>
              {', '}
            </div>
            <div className="property">
              <label>&quot;_errors&quot;:</label>
              {' [ '}
              {touched.email && errors.email?.email && (
                <label className="red row">&quot;{t('contact.form.error.emailInvalid')}&quot;,</label>
              )}
              {touched.email && errors.email?.required && (
                <label className="red row">&quot;{t('contact.form.error.emailRequired')}&quot;,</label>
              )}
              {touched.message && errors.message && (
                <label className="red row">&quot;{t('contact.form.error.messageRequired')}&quot;,</label>
              )}
              {' ] '}
            </div>
            {' } '}
          </div>
        </div>

        <form
          className={status === FormStatus.Loading ? 'loading' : undefined}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={`submitted${status ? ' show' : ''}`}>
            {status === FormStatus.Submitted && <label>Form successfully submitted:)</label>}
          </div>

          <input
            type="email"
            required
            placeholder={t('contact.form.email') + '*'}
            value={display(value.email)}
            onChange={onChange('email')}
            onBlur={onBlur('email')}
            className={touched.email && errors.email ? 'error' : undefined}
          />
          <input
            type="text"
            placeholder={t('contact.form.name')}
            value={display(value.first_name)}
            onChange={onChange('first_name')}
            onBlur={onBlur('first_name')}
          />
          <input
            type="text"
            placeholder={t('contact.form.company')}
            value={display(value.company)}
            onChange={onChange('company')}
            onBlur={onBlur('company')}
          />
          <textarea
            placeholder={t('contact.form.message') + '*'}
            required
            value={display(value.message)}
            onChange={onChange('message')}
            onBlur={onBlur('message')}
            className={touched.message && errors.message ? 'error' : undefined}
          ></textarea>

          <div className="flex">
            <div className="checkbox">
              <span
                className={`pointer${agreedToPrivacy ? ' checked' : ''}`}
                onClick={() => setAgreedToPrivacy(!agreedToPrivacy)}
              ></span>
              <label>
                {' '}
                {t('contact.form.privacyPolicy')}{' '}
                <TLink href="/privacy-policy">{t('contact.form.gdpr')}</TLink>
              </label>
              {!agreedToPrivacy && agreedToPrivacy !== undefined && (
                <p className="error">{t('contact.privacyAgreementError')}</p>
              )}
            </div>
            <DvLink onClick={submit} textKey="contact.form.submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
