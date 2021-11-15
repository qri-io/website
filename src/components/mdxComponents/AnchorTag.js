import * as React from 'react'

import Link from '../Link'

const AnchorTag = (props) => {
  if (props.children) {
    return (
      <Link to={props.href} title={props.title} colorClassName='text-qritile hover:text-qritile-600' target="_blank" rel="noopener noreferrer">{props.children}</Link>
    )
  } else {
    return null
  }
}

export default AnchorTag
