import React from 'react'

const ExternalLink = ({ className, to, children, onClick = () => {} }) => (
  <a
    className={className}
    href={to}
    target='_blank'
    rel='noopener noreferrer'
    onClick={onClick}
  >
    {children}
  </a>
)

export default ExternalLink
