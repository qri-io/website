import React from 'react'
import classNames from 'classnames'

import Link from './Link'
import Icon from './Icon'

const HeaderLink = ({
  data,
  className,
  onClick = () => {}
}) => {
  const { link, text, colorClass } = data

  if (link !== '' && text !== '') {
    return (
      <li className={classNames('flex items-center group', className)} onClick={onClick}>
        {colorClass && (
          <div className='transform transition-all duration-300 group-hover:scale-125'>
            <Icon icon='docsRing' size='2xs' className={classNames(colorClass, 'mr-2')}/>
          </div>
        )}
        <Link colorClassName={'text-black'} to={link}>{text}</Link>
      </li>
    )
  }
}

export default HeaderLink
