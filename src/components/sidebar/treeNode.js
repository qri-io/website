import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import ExpansionArrow from '../ExpansionArrow'
import config from '../../../config'

const MiniNumber = ({ children }) => (
  <div
    className='font-semibold bg-qrigray-200 text-qrigray-700 inline-block ml-2 rounded-sm'
    style={{
      fontSize: 8,
      padding: '4px 3px 2px 3px',
      lineHeight: 0.75
    }}
  >
    {children}
  </div>
)

const TreeNode = (props) => {
  const { setCollapsed, collapsed, url, title, items = [], level } = props

  const isCollapsed = collapsed[url]

  const collapse = () => {
    setCollapsed(url)
  }

  const hasChildren = items.length !== 0

  let location
  let active = false

  if (typeof (document) !== 'undefined') {
    location = document.location
    // remove trailing slash
    const pathname = location.pathname.replace(/\/$/, '')

    active = location && (pathname === url || pathname === (config.gatsby.pathPrefix + url))
  }

  let titleContent

  if (title) {
    titleContent = (
      <>
        {title}
      </>
    )
  }

  if (url) {
    titleContent = (
      <div className='flex'>
        <div className='flex-grow flex items-center'>
          <div className="mr-2">
            {!config.sidebar.frontLine && title && hasChildren ? (
              <ExpansionArrow expanded={!isCollapsed} size='4xs' onClick={collapse} />
            ) : <div className='w-2'>&nbsp;</div> }
          </div>
          <Link to={url}>
            <div className={classNames('flex items-center my-1 hover:text-qripink transition-all transition-100', {
              'font-semibold text-black uppercase': level === 0,
              'text-qrigray-700': (level === 1) && !active,
              'text-qrigray-400': (level === 2) && !active,
              'text-qripink': active
            })}>
              {titleContent} {!!items.length && <MiniNumber>{items.length}</MiniNumber>}
            </div>
          </Link>
        </div>
        {/* selected item "pill" */}
        <div className='py-0.5 ml-9'>
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
  }
  return (
    <li
      className={classNames({
        'ml-2': level > 0
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
              level = {level + 1}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
export default TreeNode
