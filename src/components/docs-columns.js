import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import mdxComponents from './mdxComponents'
import Sidebar from './sidebar'
import RightSidebar from './RightSidebar'

// docs is a two-column layout, with the sidebar and main content area overflowing vertically
// the right sidebar for jumping to content within an article lives in the main content area

const DocsColumns = ({ children, location }) => (
  <MDXProvider components={mdxComponents}>
    <div className='flex-grow overflow-hidden flex'>
      <div className={'hidden sm:block overflow-y-scroll flex-shrink-0'} style={{
        maxWidth: 300
      }}>
        <Sidebar location={location} />
      </div>
      <div className='flex-grow overflow-y-scroll overflow-x-hidden flex relative'>
        <div className='flex-grow flex-shrink'>
          {children}
        </div>
        <div className='h-full border-l border-separator sticky top-0 ml-16' style={{
          minWidth: 222
        }}>
          <RightSidebar location={location} />
        </div>
      </div>
    </div>
  </MDXProvider>
)

export default DocsColumns
