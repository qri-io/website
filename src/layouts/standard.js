import React from 'react'

import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'

const StandardLayout = (props) => {
  return (
    <div className='standard-layout-wrapper flex-column' style={{
      ...props.style
    }}>
      <MainHeader {...props} />
      <div style={{ flex: '1 0 auto' }}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default StandardLayout
