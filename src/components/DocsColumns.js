import React, { useState } from 'react'
import classNames from 'classnames'

import Sidebar from './sidebar'
import IconButton from './IconButton'
import RightSidebar from './RightSidebar'

// docs is a two-column layout, with the sidebar and main content area overflowing vertically
// the right sidebar for jumping to content within an article lives in the main content area

const DocsColumns = ({ children, location, sidebar = true }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  return (
    <>
      { sidebar && (
        <div className='block sm:hidden sticky z-10 h-full flex flex-col' style={{
          top: 75
        }}>
          <div className='font-semibold uppercase flex items-center px-5 py-4 bg-qrigray-100 text-qrigray border-b relative'>
            <div className='flex-grow'>Table of Contents</div>
            <div onClick={() => { setShowMobileSidebar(!showMobileSidebar) }} className={classNames('transform transition-all', {
              'rotate-90': showMobileSidebar
            })}><IconButton icon='caretRight' size='xs' /></div>
          </div>
          {showMobileSidebar && (
            <div className='overflow-y-scroll flex-grow min-h-0' onClick={() => { setShowMobileSidebar(false) }}>
              <Sidebar location={location} mobile />
            </div>
          )}
        </div>
      )}
      <div className='flex-grow flex flex-row'>
        { sidebar && (
          <div className={'hidden sm:block flex-shrink-0'} style={{
            width: 250
          }}>
            <Sidebar location={location} />
          </div>
        )}
        <div className='flex-grow overflow-x-hidden flex flex-col md:flex-row relative'>
          {children}
        </div>
        <RightSidebar location={location} />
      </div>
    </>
  )
}

export default DocsColumns
// markdown content with ToC
