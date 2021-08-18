import React from 'react'
import CustomIcon from '../CustomIcon'

const Close = (props) => (
  <CustomIcon {...props}>
    <path d="M3 3.25L20.5 20.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20.75L20.5 3.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </CustomIcon>
)

export default Close
