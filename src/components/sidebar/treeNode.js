import React from 'react'
import config from '../../../config'
import { Link } from 'gatsby'

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url]
  const hasChildren = items.length !== 0
  let location
  if (typeof (document) !== 'undefined') {
    location = document.location
  }
  const active =
    location && (location.pathname === url || location.pathname === (config.gatsby.pathPrefix + url))
  const calculatedClassName = `${className} item ${active ? 'active' : ''}`

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
        {titleContent}
      </Link>
    )
  } else {
    titleContent = (
      <div className='section-header'>
        {titleContent}
      </div>
    )
  }
  return (
    <li
      className={calculatedClassName}
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
