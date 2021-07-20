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
      <div className='flex'>
        <div className='flex-grow'>
          <Link to={url}>
            <div className={classNames('flex items-center my-1 hover:text-qripink transition-all transition-100', {
              'text-qripink': active
            })}>
              <DocsRingIcon className='mr-2'/>
              {titleContent}
            </div>
          </Link>
        </div>
        {/* selected item "pill" */}
        <div className='py-0.5 ml-6'>
          <div
            className={classNames('bg-qripink h-full transition-all transition-100', {
              'opacity-100': active,
              'opacity-0': !active
            })}
            style={{
              width: 5,
              borderRadius: 2.5
            }}
          />
        </div>
      </div>
    )
  } else {
    titleContent = (
      <div className={classNames('font-semibold text-black my-1', {
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
