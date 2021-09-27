import React from 'react'
import classNames from 'classnames'

import IconButton from './IconButton'

const ExpansionArrow = ({ expanded = false, size = 'xs', onClick }) => (
  <div
    onClick={onClick}
    className={classNames('inline-block transform transition-all', {
      'rotate-90': expanded
    })}>
    <IconButton icon='caretRight' size={size} />
  </div>
)

export default ExpansionArrow
