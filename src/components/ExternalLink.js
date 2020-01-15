import React from 'react'

const ExternalLink = ({ className, to, children }) => (
  <a className={className} href={to} target='_blank' rel='noopener noreferrer'>{children}</a>
)

export default ExternalLink
