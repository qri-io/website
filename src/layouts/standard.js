import React from 'react'

import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'

const StandardLayout = (props) => {
  return (
    <div className='standard-layout-wrapper flex-column relative' style={{
      ...props.style
    }}>
      {/* this needs to be here for this background blob to show up in the correct spot/z-index */}
      {props.location.pathname === '/' && (
        <img className='transform scale-60 origin-top-right sm:transform-none absolute top-0 right-0 z-0' src='/img/new-docs/homepage/yellow-aura-0.svg'/>
      )}
      <MainHeader {...props} />
      <div className='relative' style={{ flex: '1 0 auto' }}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default StandardLayout
