import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RECAPTCHA_SITE_KEY, type Lang } from '../lib/site';
import { sendContact, type ContactResult } from '../lib/api';

export default function Contact({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState<ContactResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function markInvalid(el: HTMLInputElement | HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.borderColor = '#e41919';
    el.style.borderWidth = '.3em';
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // Simple client-side validation (mirrors the original contact-form.html).
    let proceed = true;
    if (!nameRef.current?.value) {
      markInvalid(nameRef.current);
      proceed = false;
    }
    if (!emailRef.current?.value) {
      markInvalid(emailRef.current);
      proceed = false;
    }
    if (!messageRef.current?.value) {
      markInvalid(messageRef.current);
      proceed = false;
    }
    if (!proceed || submitting) return;

    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return;

    setSubmitting(true);
    grecaptcha.ready(async () => {
      try {
        // grecaptcha.execute() returns a non-standard thenable that has no
        // .finally(), so await it inside try/finally instead of chaining
        // .finally() (which would throw and leave `submitting` stuck at true).
        const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
        const response = await sendContact({
          userName: nameRef.current?.value ?? '',
          userEmail: emailRef.current?.value ?? '',
          userMessage: messageRef.current?.value ?? '',
          token,
          lang,
        });
        setResult(response);
        if (response.type !== 'error') {
          if (nameRef.current) nameRef.current.value = '';
          if (emailRef.current) emailRef.current.value = '';
          if (messageRef.current) messageRef.current.value = '';
        }
      } catch {
        setResult({ text: t('contact.error', 'Something went wrong'), type: 'error' });
      } finally {
        setSubmitting(false);
      }
    });
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.currentTarget.style.borderColor = '';
    setResult(null);
  }

  return (
    <section className="page-section bg-dark light-content" id="contact">
      <div className="container relative">
        <div className="text-center mb-80 mb-sm-50">
          <h2 className="section-title">{t('contact.title', 'Contact Me')}</h2>
          <p className="section-title-descr">{t('contact.subtitle', 'Hire me or get in touch with me if you need a project developed')}</p>
        </div>

        <div className="row mb-60 mb-xs-40">
          <div className="col-md-10 offset-md-1">
            <div className="row justify-content-center">
              {/* Gmail */}
              <div className="col-sm-6 col-lg-4 pb-20">
                <div className="contact-item wow animate__animated animate__fadeScaleIn" data-wow-delay=".2s" data-wow-duration="1s">
                  <div className="ci-icon">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="ci-title">Gmail</div>
                  <div className="ci-text">memo.or99@gmail.com</div>
                  <div className="ci-link">
                    <a href="mailto:memo.or99@gmail.com" target="_blank" rel="noopener noreferrer">
                      {t('contact.getInTouch', 'Get in touch')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Outlook */}
              <div className="col-sm-6 col-lg-4 pb-20">
                <div className="contact-item wow animate__animated animate__fadeScaleIn" data-wow-delay=".2s" data-wow-duration="1s">
                  <div className="ci-icon">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="ci-title">Outlook</div>
                  <div className="ci-text">memo.or99@hotmail.com</div>
                  <div className="ci-link">
                    <a href="mailto:memo.or99@hotmail.com" target="_blank" rel="noopener noreferrer">
                      {t('contact.getInTouch', 'Get in touch')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <form className="form contact-form wow animate__animated animate__fadeInUpShort" data-wow-delay=".5s" id="contact_form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">{t('contact.name', 'Name')}</label>
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      id="name"
                      className="input-lg round form-control"
                      placeholder={t('contact.enterName', 'Enter your name')}
                      pattern=".{3,100}"
                      required
                      aria-required="true"
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">{t('contact.email', 'Email')}</label>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      id="email"
                      className="input-lg round form-control"
                      placeholder={t('contact.enterEmail', 'Enter your email')}
                      pattern=".{5,100}"
                      required
                      aria-required="true"
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message', 'Message')}</label>
                <textarea
                  ref={messageRef}
                  name="message"
                  id="message"
                  className="input-lg round form-control"
                  style={{ height: '130px' }}
                  placeholder={t('contact.enterMessage', 'Enter your message')}
                  onKeyUp={handleKeyUp}
                />
                <div className="form-tip pt-20 pt-sm-0 mb-sm-20">
                  {t('contact.recaptchaNotice', 'This site is protected by reCAPTCHA and the Google')}{' '}
                  <a href="https://policies.google.com/privacy">{t('contact.privacyPolicy', 'Privacy Policy')}</a> {t('contact.and', 'and')}{' '}
                  <a href="https://policies.google.com/terms">{t('contact.termsOfService', 'Terms of Service')}</a> {t('contact.apply', 'apply.')}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-tip pt-20 pt-sm-0 mb-sm-20">{t('contact.allRequired', 'All the fields are required')}</div>
                </div>
                <div className="col-sm-6">
                  <div className="text-end pt-10">
                    <button
                      className="g-recaptcha submit_btn btn btn-w btn-mod btn-large btn-round"
                      id="submit_btn"
                      aria-controls="result"
                      onClick={handleSubmit}
                    >
                      {t('contact.submit', 'Submit Message')}
                    </button>
                  </div>
                </div>
              </div>

              <div id="result" role="region" aria-live="polite" aria-atomic="true">
                {result && <div className={result.type === 'error' ? 'error' : 'success'}>{result.text}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
