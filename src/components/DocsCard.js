import React from 'react'
import classNames from 'classnames'

import Link from './Link'
import Icon from './Icon'

const DocsCard = ({ title, description, url, titlePrefix = '', colorClass }) => {
  const titleContent = titlePrefix ? `${titlePrefix} - ${title}` : title
  return (
    <Link
      key={title}
      to={url}
      colorClassName='text-qrigray-400 hover:text-qrigray-500'
    >
      <div
        className='rounded-lg border-solid border border-qrigray-100 box-border px-4 py-3 flex h-32'
      >
        <div className="flex-shrink-0">
          <Icon icon='docsRing' size='3xs' className={classNames('mb-1 mr-2.5', colorClass)} />
        </div>
        <div className="flex-grow flex flex-col">
          <div className='font-bold text-sm text-black mb-2'>{titleContent}</div>
          <div className='text-xs line-clamp-3 overflow-hidden' style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default DocsCard
