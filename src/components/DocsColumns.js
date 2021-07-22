import React from 'react'

import Sidebar from './sidebar'

// docs is a two-column layout, with the sidebar and main content area overflowing vertically
// the right sidebar for jumping to content within an article lives in the main content area

const DocsColumns = ({ children, location, sidebar = true }) => (
  <div className='flex-grow overflow-hidden flex'>
    { sidebar && (
      <div className={'hidden sm:block overflow-y-scroll flex-shrink-0'} style={{
        width: 250
      }}>
        <Sidebar location={location} />
      </div>
    )}
    <div className='flex-grow overflow-y-scroll overflow-x-hidden flex relative'>
      {children}
    </div>
  </div>
)

export default DocsColumns
// markdown content with ToC
