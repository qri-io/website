import React from 'react'
import styled from '@emotion/styled'

import Footer from '../components/Footer'

export const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

export const Content = styled('main')`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media only screen and (max-width: 767px) {
    height: auto;
  }
`

const StandardLayout = ({ children }) => {
  return (
    <div className='standard-layout-wrapper flex-column'>
      <Content>
        <div style={{ flex: '1 0 auto' }}>
          {children}
        </div>
        <Footer />
      </Content>
    </div>
  )
}

export default StandardLayout
