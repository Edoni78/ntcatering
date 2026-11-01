import { useState } from 'react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import './Calculator.css'

const menus = [
  {
    id: 'menu-1',
    index: '01',
    title: 'Menu 1',
    text: 'Për pritje të lehta, me zgjedhje të kujdesshme në tryezë.',
    price: 8,
  },
  {
    id: 'menu-2',
    index: '02',
    title: 'Menu 2',
    text: 'Më e plotë, me meze, tortilla dhe ëmbëlsira.',
    price: 13.5,
  },
  {
    id: 'menu-3',
    index: '03',
    title: 'Menu 3',
    text: 'Menuja më e pasur, me fli dhe tre lloje brusketash.',
    price: 15.5,
  },
]

const MIN_GUESTS = 1
const MAX_GUESTS = 500

function formatEuro(value) {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

function Calculator() {
  const [menuId, setMenuId] = useState(menus[0].id)
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
          <SectionLabel>Kalkulatori</SectionLabel>
          <h2 className="plan-calc__heading" id="plan-calc-title">
            <span className="plan-calc__line">
              <span>Zgjidhni menunë</span>
            </span>
            <span className="plan-calc__line">
              <span>dhe mysafirët.</span>
            </span>
          </h2>
        </header>

        <div className="plan-calc__menus" role="radiogroup" aria-label="Zgjidhni menunë">
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
                  <span className="plan-calc__unit">€ / për person</span>
                </p>
              </button>
            )
          })}
        </div>

        <div className="plan-calc__controls">
          <div className="plan-calc__guests">
            <p className="plan-calc__label">Numri i mysafirëve</p>
            <div className="plan-calc__stepper">
              <button type="button" aria-label="Pakëso" onClick={() => setCount(guests - 1)}>
                −
              </button>
              <input
                type="number"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                value={guests}
                onChange={(event) => setCount(Number(event.target.value) || MIN_GUESTS)}
                aria-label="Numri i mysafirëve"
              />
              <button type="button" aria-label="Shto" onClick={() => setCount(guests + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="plan-calc__total">
            <p className="plan-calc__label">Totali për {guests} persona</p>
            <p className="plan-calc__sum">
              <span>{formatEuro(total)}</span>
              <span>€</span>
            </p>
            <p className="plan-calc__note">
              {menu.title} · {formatEuro(menu.price)} € për person
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
