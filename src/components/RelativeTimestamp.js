import React from 'react'
import moment from 'moment'

const RelativeTimestamp = ({ timestamp }) => (
  <span
    className='relative-timestamp'
    title={moment(timestamp).format('MMM D YYYY, h:mm A zz')}
  >
    {moment(timestamp).fromNow()}
  </span>
)

export default RelativeTimestamp
