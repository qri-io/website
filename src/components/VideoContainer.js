import React from 'react'
import classNames from 'classnames'

import ExternalLink from '../components/ExternalLink'

const VideoContainer = ({ id, title, className }) => (
  <div
    className={classNames('rounded-lg bg-white p-2 md:p-4 inline-block max-w-xl', className)}
    style={{
      boxShadow: '0px 0px 5.17582px rgba(0, 0, 0, 0.1)'
    }}
  >
    <ExternalLink to={`https://www.youtube.com/watch?v=${id}`}>
      <div>
        <div className='mb-2'>
          <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} />
        </div>
        <div className='text-sm md:text-base text-qritile-600 font-bold text-left'>
          <span className=''>{title}</span>
        </div>
      </div>
    </ExternalLink>
  </div>
)

export default VideoContainer
