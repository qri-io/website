import React from 'react'
import styled from '@emotion/styled'
import ThemeProvider from './themeProvider'
import Sidebar from './sidebar'
import RightSidebar from './rightSidebar'

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  margin-top: 3rem;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 3rem;
  }
`

const MaxWidth = styled('div')`

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`
const LeftSideBarWidth = styled('div')`
  width: 298px;
`
const RightSideBarWidth = styled('div')`
  width: 224px;
`
const StandardLayout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <Wrapper>
      <Content>
        <MaxWidth>{children}</MaxWidth>
      </Content>
    </Wrapper>
  </ThemeProvider>
)

export default StandardLayout
