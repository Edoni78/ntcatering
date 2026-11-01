import { useState } from 'react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
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
  const [values, setValues] = useState(initial)
  const [sent, setSent] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').replace(/^383/, '')
      setValues((current) => ({ ...current, phone: digits }))
      return
    }
    setValues((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact-form" id="mesazhi" aria-labelledby="contact-form-title">
      <div className="container contact-form__inner">
        <header className="contact-form__header">
          <SectionLabel>Mesazhi</SectionLabel>
          <h2 className="contact-form__heading" id="contact-form-title">
            <span className="contact-form__line">
              <span>Tregoni për</span>
            </span>
            <span className="contact-form__line">
              <span>eventin tuaj.</span>
            </span>
          </h2>
        </header>

        {sent ? (
          <p className="contact-form__thanks">
            Faleminderit. Do t’ju kthehemi së shpejti.
          </p>
        ) : (
          <form className="contact-form__form" onSubmit={onSubmit}>
            <label>
              <span>Emri</span>
              <input name="name" value={values.name} onChange={onChange} required autoComplete="name" />
            </label>
            <label>
              <span>Telefoni</span>
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
                  aria-label="Numri i telefonit, pas +383"
                />
              </div>
            </label>
            <label>
              <span>Data e eventit</span>
              <input type="date" name="date" value={values.date} onChange={onChange} />
            </label>
            <label>
              <span>Numri i mysafirëve</span>
              <input
                type="number"
                name="guests"
                min="1"
                value={values.guests}
                onChange={onChange}
              />
            </label>
            <label className="contact-form__full">
              <span>Mesazhi</span>
              <textarea name="message" rows="5" value={values.message} onChange={onChange} required />
            </label>
            <div className="contact-form__actions">
              <button className="btn btn--fill" type="submit">
                <span>Dërgo</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default ContactForm
