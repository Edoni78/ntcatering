import { useState } from 'react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Calculator.css'

const prices = [8, 13.5, 15.5]
const ids = ['menu-1', 'menu-2', 'menu-3']

const MIN_GUESTS = 1
const MAX_GUESTS = 500

function formatEuro(value) {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

function Calculator() {
  const { t } = useI18n()
  const heading = t('plan.calc.heading')
  const menus = t('home.menus.items').map((item, index) => ({
    ...item,
    id: ids[index],
    price: prices[index],
  }))
  const [menuId, setMenuId] = useState(ids[0])
  const [guests, setGuests] = useState(40)

  const menu = menus.find((item) => item.id === menuId) ?? menus[0]
  const total = menu.price * guests

  const setCount = (next) => {
    const value = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, next))
    setGuests(value)
  }

  return (
    <section className="plan-calc" id="kalkulatori" aria-labelledby="plan-calc-title">
      <div className="container plan-calc__inner">
        <header className="plan-calc__header">
          <SectionLabel>{t('plan.calc.label')}</SectionLabel>
          <h2 className="plan-calc__heading" id="plan-calc-title">
            {heading.map((line) => (
              <span className="plan-calc__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="plan-calc__menus" role="radiogroup" aria-label={t('plan.calc.group')}>
          {menus.map((item) => {
            const selected = item.id === menu.id
            return (
              <button
                type="button"
                className={`plan-calc__menu${selected ? ' is-selected' : ''}`}
                key={item.id}
                role="radio"
                aria-checked={selected}
                onClick={() => setMenuId(item.id)}
              >
                <p className="plan-calc__index">{item.index}</p>
                <h3>{item.title}</h3>
                <p className="plan-calc__text">{item.text}</p>
                <p className="plan-calc__price">
                  <span className="plan-calc__amount">{formatEuro(item.price)}</span>
                  <span className="plan-calc__unit">{t('plan.calc.unit')}</span>
                </p>
              </button>
            )
          })}
        </div>

        <div className="plan-calc__controls">
          <div className="plan-calc__guests">
            <p className="plan-calc__label">{t('plan.calc.guests')}</p>
            <div className="plan-calc__stepper">
              <button type="button" aria-label={t('plan.calc.minus')} onClick={() => setCount(guests - 1)}>
                −
              </button>
              <input
                type="number"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                value={guests}
                onChange={(event) => setCount(Number(event.target.value) || MIN_GUESTS)}
                aria-label={t('plan.calc.guests')}
              />
              <button type="button" aria-label={t('plan.calc.plus')} onClick={() => setCount(guests + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="plan-calc__total">
            <p className="plan-calc__label">{t('plan.calc.total', { guests })}</p>
            <p className="plan-calc__sum">
              <span>{formatEuro(total)}</span>
              <span>€</span>
            </p>
            <p className="plan-calc__note">
              {t('plan.calc.note', { menu: menu.title, price: formatEuro(menu.price) })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
