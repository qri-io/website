import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import config from '../../../config'

const TreeNode = (props) => {
  const { setCollapsed, collapsed, url, label, title, items, firstLevel } = props
  // TODO(chriswhong): there is potential for name conflicts here when using the
  // label field to determine collapsed state, but nodes with children won't
  // necessarily have a URL
  const isCollapsed = collapsed[url] || collapsed[label]

  // uncomment to restore collapsible sections
  // const collapse = () => {
  //   setCollapsed(url || label)
  // }

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
        {/* uncomment to restore collapsible sections
          {!config.sidebar.frontLine && title && hasChildren ? (
          <button
            onClick={collapse}
            aria-label='collapse'
            className='collapser'>
            {!isCollapsed ? <>&#9660;</> : '>'}
          </button>
        ) : null } */}
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
              {titleContent}
            </div>
          </Link>
        </div>
        {/* selected item "pill" */}
        <div className='py-0.5 ml-10'>
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
      <div className={classNames('my-1', {
        'text-qripink': active,
        'font-semibold text-black': firstLevel,
        'font-medium text-qrigray-700': !firstLevel
      })}>
        {titleContent}
      </div>
    )
  }
  return (
    <li
      className={classNames({
        'mb-4': !url,
        'ml-4': !firstLevel && !url
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
              firstLevel={false}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
export default TreeNode
