import * as React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import defaultTheme from './theme'
import DocsHeader from './DocsHeader'

export default function ThemeProvider ({ children, theme = {}, location }) {
  return (
    <div>
      <DocsHeader location={location} />
      <EmotionThemeProvider theme={{ ...defaultTheme, ...theme }}>
        {children}
      </EmotionThemeProvider>
    </div>
  )
}
