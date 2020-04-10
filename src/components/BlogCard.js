import React from 'react'
import moment from 'moment'

import ExternalLink from './ExternalLink'

const BlogCard = (props) => {
  const {
    title,
    link,
    image,
    by,
    date,
    onClick
  } = props

  return (
    <div className='card blog-card index-shadow index-card' onClick={onClick}>
      <ExternalLink to={link}>
        <div className='card-img' style={{ backgroundImage: `url('${image}')` }} />
        <div className='card-body px-3'>
          <div className='title'>{title}</div>
          <div className='row'>
            <div className='col-7'>
              <span className='details mr-4'>by {by}</span>
            </div>
            <div className='col-5 text-right'>
              <span className='details'>{moment(date).fromNow()}</span>
            </div>
          </div>
        </div>
      </ExternalLink>
    </div>
  )
}

export default BlogCard
