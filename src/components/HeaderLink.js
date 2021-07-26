import React from 'react'
import classNames from 'classnames'

import Link from './Link'
import Icon from './Icon'

const HeaderLink = ({
  data
}) => {
  const { link, text, colorClass } = data

  console.log(link)

  if (link !== '' && text !== '') {
    return (
      <li className='ml-10 flex items-center'>
        {colorClass && (<Icon icon='docsRing' size='2xs' className={classNames(colorClass, 'mr-2')}/>)}
        <Link colorClassName={'text-black'} to={link}>{text}</Link>
      </li>
    )
  }
}

export default HeaderLink
