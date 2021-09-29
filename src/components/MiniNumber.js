import React from 'react'
import classNames from 'classnames'

const MiniNumber = ({ className, children }) => (
  <div
    className={classNames('font-semibold bg-qrigray-200 text-qrigray-700 inline-block rounded-sm', className)}
    style={{
      fontSize: 8,
      padding: '4px 3px 2px 3px',
      lineHeight: 0.75
    }}
  >
    {children}
  </div>
)

export default MiniNumber
