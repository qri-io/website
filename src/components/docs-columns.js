import React from 'react'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from './mdxComponents'
import Sidebar from './sidebar'
import RightSidebar from './rightSidebar'

const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

const Content = styled('main')`
  overflow: auto;
  padding: 0px 88px;
  padding-top: 3rem;
  padding-bottom: 3rem;

  @media only screen and (max-width: 1023px) {
    padding: 0 10px;
    padding-top: 3rem;
  }
`

const MaxWidth = styled('div')`

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`
const LeftSideBarWidth = styled('div')`
  flex: 0 0 220px;
  overflow: auto;
`
const RightSideBarWidth = styled('div')`
  flex: 0 0 220px;
`
const DocsColumns = ({ children, location }) => (
  <MDXProvider components={mdxComponents}>
    <Wrapper>
      <LeftSideBarWidth className={'hiddenMobile'}>
        <Sidebar location={location} />
      </LeftSideBarWidth>
      <Content key={location.pathname}>
        <MaxWidth>{children}</MaxWidth>
      </Content>
      <RightSideBarWidth className={'hiddenMobile'}>
        <RightSidebar location={location} />
      </RightSideBarWidth>
    </Wrapper>
  </MDXProvider>
)

export default DocsColumns
