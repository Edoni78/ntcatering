import { MdOutlineDinnerDining } from 'react-icons/md'
import './SectionLabel.css'

function SectionLabel({ children, tone = 'cream' }) {
  return (
    <p className={`section-label section-label--${tone}`}>
      <MdOutlineDinnerDining aria-hidden />
      <span>{children}</span>
    </p>
  )
}

export default SectionLabel
