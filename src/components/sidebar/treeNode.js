import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import config from '../../../config'
import DocsRingIcon from '../DocsRingIcon'

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url]
  const hasChildren = items.length !== 0
  let location
  if (typeof (document) !== 'undefined') {
    location = document.location
  }
  const active =
    location && (location.pathname === url || location.pathname === (config.gatsby.pathPrefix + url))

  let titleContent

  if (title) {
    titleContent = (
      <>
        {title}
        {/* !config.sidebar.frontLine && title && hasChildren ? (
          <button
            onClick={collapse}
            aria-label='collapse'
            className='collapser'>
            {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
          </button>
        ) : null */}
      </>
    )
  }

  if (url) {
    titleContent = (
      <Link to={url}>
        <div className={classNames('flex items-center mb-2', {
          'text-qripink': active
        })}>
          <DocsRingIcon className='mr-2'/>
          {titleContent}
        </div>
      </Link>
    )
  } else {
    titleContent = (
      <div className={classNames('font-semibold text-black mb-2', {
        'text-qripink': active
      })}>
        {titleContent}
      </div>
    )
  }
  return (
    <li
      className={classNames({
        'mb-4': !url
      })}
    >
      {titleContent}
      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item) => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
export default TreeNode
