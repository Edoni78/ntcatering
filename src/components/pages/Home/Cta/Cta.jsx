import { Link } from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'
import defaultImage from '../../../../assets/branding/brand6.png'
import './Cta.css'

function Cta({
  image = defaultImage,
  flush = false,
  to = '/planifiko-eventin',
  linkLabel = 'Planifiko eventin',
}) {
  return (
    <section className={`cta${flush ? ' cta--flush' : ''}`} id="plan">
      <div className="cta__frame">
        <img className="cta__image" src={image} alt="" />
        <div className="cta__shade" />
        <div className="cta__veil" />
        <div className="cta__copy">
          <h2 className="cta__title">Kur të jeni gati.</h2>
          <Link className="cta__link btn btn--fill" to={to}>
            <span>{linkLabel}</span>
            <HiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cta
