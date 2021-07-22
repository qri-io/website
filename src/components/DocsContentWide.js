import React from 'react'

import DocsFooter from './DocsFooter'

const DocsContentWide = ({ children }) => (
  <div className='w-full flex flex-col flex-grow h-full'>
    <div className='w-full px-10 mx-auto flex-grow'>
      <div className='py-10'>
        <div className='max-w-screen-md mx-auto'>
          {children}
        </div>
      </div>
    </div>
    <div className='flex-shrink-0'>
      <DocsFooter />
    </div>
  </div>
)

export default DocsContentWide
