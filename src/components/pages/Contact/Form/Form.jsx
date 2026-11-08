import { useState } from 'react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { sendContact } from '../../../../lib/supabase'
import { useI18n } from '../../../../i18n/I18n'
import './Form.css'

const PREFIX = '+383'

const initial = {
  name: '',
  phone: '',
  date: '',
  guests: '',
  message: '',
}

function ContactForm() {
  const { t } = useI18n()
  const heading = t('contact.form.heading')
  const [values, setValues] = useState(initial)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').replace(/^383/, '')
      setValues((current) => ({ ...current, phone: digits }))
      return
    }
    setValues((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSending(true)
    try {
      await sendContact(values)
      setSent(true)
    } catch {
      setError(t('contact.form.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-form" id="mesazhi" aria-labelledby="contact-form-title">
      <div className="container contact-form__inner">
        <header className="contact-form__header">
          <SectionLabel>{t('contact.form.label')}</SectionLabel>
          <h2 className="contact-form__heading" id="contact-form-title">
            {heading.map((line) => (
              <span className="contact-form__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </header>

        {sent ? (
          <p className="contact-form__thanks">{t('contact.form.thanks')}</p>
        ) : (
          <form className="contact-form__form" onSubmit={onSubmit}>
            <label>
              <span>{t('contact.form.name')}</span>
              <input name="name" value={values.name} onChange={onChange} required autoComplete="name" />
            </label>
            <label>
              <span>{t('contact.form.phone')}</span>
              <div className="contact-form__phone">
                <span className="contact-form__prefix">{PREFIX}</span>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={onChange}
                  required
                  inputMode="numeric"
                  autoComplete="tel-national"
                  minLength={8}
                  maxLength={9}
                  pattern="[0-9]{8,9}"
                  aria-label={t('contact.form.phoneAria')}
                />
              </div>
            </label>
            <label>
              <span>{t('contact.form.date')}</span>
              <input type="date" name="date" value={values.date} onChange={onChange} />
            </label>
            <label>
              <span>{t('contact.form.guests')}</span>
              <input
                type="number"
                name="guests"
                min="1"
                value={values.guests}
                onChange={onChange}
              />
            </label>
            <label className="contact-form__full">
              <span>{t('contact.form.message')}</span>
              <textarea name="message" rows="5" value={values.message} onChange={onChange} required />
            </label>
            {error ? <p className="contact-form__error">{error}</p> : null}
            <div className="contact-form__actions">
              <button className="btn btn--fill" type="submit" disabled={sending}>
                <span>{sending ? t('contact.form.sending') : t('contact.form.send')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default ContactForm
