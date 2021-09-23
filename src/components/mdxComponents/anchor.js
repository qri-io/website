import * as React from 'react'

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <a className='text-qritile hover:text-qritile-600 cursor-pointer' href={props.href} target="_blank" rel="noopener noreferrer">{link}</a>
    )
  } else {
    return null
  }
}

export default AnchorTag
