import { HiArrowUpRight } from 'react-icons/hi2'
import ctaImage from '../../../../assets/home/ourphilosophy/img2.jpg'
import './Cta.css'

function Cta() {
  return (
    <section className="cta" id="plan">
      <div className="cta__frame">
        <img className="cta__image" src={ctaImage} alt="" />
        <div className="cta__shade" />
        <div className="cta__veil" />
        <div className="cta__copy">
          <h2 className="cta__title">Gati kur të jeni.</h2>
          <p className="cta__text">
            Na tregoni për eventin tuaj.
            <br />
            Një fjali mjafton për të filluar.
          </p>
          <a className="cta__link" href="#contact">
            Planifiko eventin
            <HiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Cta
