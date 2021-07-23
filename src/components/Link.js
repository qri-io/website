import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

const defaultColorClassName = 'text-qrinavy hover:text-qripink'

const CustomLink = ({
  to,
  size = 'sm',
  className,
  colorClassName = defaultColorClassName,
  onClick,
  children
}) => {
  const combinedClassNames = classNames('cursor-pointer transition-all duration-100', colorClassName)

  // use a div by default
  let theLink = (
    <div onClick={onClick} className={combinedClassNames}>
      {children}
    </div>
  )

  // if to exists, make it a gatsby <Link>
  if (to) {
    theLink = (
      <Link to={to} className={combinedClassNames}>
        {children}
      </Link>
    )
  }

  // if to contains http:// or https:// make it an <a>
  if (to?.match(/^https?:\/\//)) {
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