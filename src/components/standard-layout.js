import React from 'react'
import ThemeProvider from './themeProvider'
import DocsHeader from './DocsHeader'

const StandardLayout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <DocsHeader location={location} />
    <div>{children}</div>
  </ThemeProvider>
)

export default StandardLayout
