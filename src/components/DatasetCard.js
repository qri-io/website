import React from 'react'
import classNames from 'classnames'

import Icon from './Icon'
import Link from './Link'
import RelativeTimestamp from './RelativeTimestamp'

const DatasetCard = ({ title, description, updatedAt, username, name, userAvatar, className }) => (
  <div className={classNames('p-4 bg-white rounded-lg flex-shrink ', className)} style={{
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)'
  }}>
    <Link to={`https://qri.cloud/${username}/${name}`}>
      <div className='text-qrigray-1000 text-lg font-semibold mb-1'>{title}</div>
      <div className='text-qrigray-400 text-sm font-light mb-2 line-clamp-3'>{description}</div>
      <div className='flex flex-nowrap'>
        <div className='text-qrigray-1000 flex items-center mr-3 my-1.5 whitespace-nowrap'>
          <Icon icon='clock' size='sm' className='mr-1.5'/>
          <div className='text-sm font-light'>
            <RelativeTimestamp timestamp={updatedAt}/>
          </div>
        </div>
        <div className='text-qrigray-1000 flex items-center my-1.5 truncate'>
          <div className='rounded-2xl inline-block mr-1.5 bg-cover flex-shrink-0' style={{
            height: 18,
            width: 18,
            backgroundImage: `url(${userAvatar})`
          }}></div>
          <div className='text-sm font-light truncate' title={username}>
            {username}
          </div>
        </div>
      </div>
    </Link>
  </div>
)

export default DatasetCard
