import React from 'react'
import ThemeProvider from './themeProvider'
import Header from './header'

const StandardLayout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <Header location={location} />
    <div>{children}</div>
  </ThemeProvider>
)

export default StandardLayout
