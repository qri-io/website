import React from 'react'
import classNames from 'classnames'

import Link from './Link'
import Icon from './Icon'
import MiniNumber from './MiniNumber'

const DocsCard = ({ title, description, url, titlePrefix = '', colorClass, items }) => {
  const titleContent = titlePrefix ? `${titlePrefix} - ${title}` : title
  return (
    <Link
      key={title}
      to={url}
      colorClassName='text-qrigray-400'
    >
      <div
        className='rounded-lg border-solid border border-qrigray-100 hover:border-qripink box-border px-4 py-3 flex h-28 transform transition-all duration-100'
      >
        <div className="flex-shrink-0">
          <Icon icon='docsRing' size='3xs' className={classNames('mb-1 mr-2.5', colorClass)} />
        </div>
        <div className="flex-grow flex flex-col min-w-0">
          <div className='font-bold text-black mb-2 flex items-center tracking-wide'>{titleContent} {items && <MiniNumber className='ml-3'>{items.length}</MiniNumber>}</div>
          <div className='text-sm overflow-hidden break-word' style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default DocsCard
