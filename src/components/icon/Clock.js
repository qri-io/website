import React from 'react'
import CustomIcon from '../CustomIcon'

const Clock = (props) => (
  <CustomIcon {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7V12.8333L14.5 15.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </CustomIcon>
)

export default Clock
