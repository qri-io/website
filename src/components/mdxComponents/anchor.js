import * as React from 'react'

import Link from '../Link'

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <Link to={props.href} colorClassName='text-qritile hover:text-qritile-600' target="_blank" rel="noopener noreferrer">{link}</Link>
    )
  } else {
    return null
  }
}

export default AnchorTag
