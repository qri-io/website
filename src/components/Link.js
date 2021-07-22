import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

const defaultColorClassName = 'text-qrinavy hover:text-qripink'

const CustomLink = ({
  to,
  size = 'sm',
  className,
  colorClassName = defaultColorClassName,
  children
}) => {
  const combinedClassNames = classNames('hover:cursor-pointer transition-all duration-100', colorClassName)

  let theLink = (
    <Link to={to} className={combinedClassNames}>
      {children}
    </Link>
  )

  if (to.includes('http')) {
    theLink = (
      <a
        href={to}
        target='_blank'
        rel="noopener noreferrer"
        className={combinedClassNames}
      >
        {children}
      </a>
    )
  }

  return (
    <div className={className}>
      {theLink}
    </div>
  )
}

export default CustomLink
