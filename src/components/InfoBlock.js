import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const InfoBlock = ({ type = 'info', children }) => {
  let icon
  switch (type) {
    case 'warning':
      icon = faExclamationTriangle
      break
    default:
      icon = faInfoCircle
  }

  return (
    <div className={`info-block ${type}`}>
      <div className='info-block-icon'>
        <FontAwesomeIcon icon={icon} />
      </div>
      {children}
    </div>
  )
}

export default InfoBlock
