import React from 'react'
import classNames from 'classnames'

import Link from './Link'
import Icon from './Icon'

const DocsCard = ({ docsSectionInfo, title, description, url, titlePrefix = '' }) => {
  const titleContent = titlePrefix ? `${titlePrefix} - ${title}` : title
  return (
    <Link key={title} to={url}>
      <div
        className='rounded-lg border-solid border border-qrigray-100 box-border px-4 py-3'
      >
        <Icon icon='docsRing' size='2xs' className={classNames('mb-2', docsSectionInfo.colorClass)} />
        <div className='font-bold text-sm text-black mb-2'>{titleContent}</div>
        <div className='text-xs'>{description}</div>
      </div>
    </Link>
  )
}

export default DocsCard
