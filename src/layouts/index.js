import React from 'react'

import DocsLayout from './docs'
import StandardLayout from './standard'
import DataStoryLayout from './data-story'
import Header from '../components/Header'

import 'bootstrap/dist/css/bootstrap.css'
import '../../static/css/highlight.default.min.css'
import '../scss/style.scss'

// this is the top-level layout, which includes the header and main content area
// the regular gatsby (jsx) pages will use a standard layout
// docs pages have context.layout === 'docs' and will use the docs layout with sidebars

const IndexLayout = (props) => {
  const { children, location, pageContext } = props
  const isDocs = pageContext.layout === 'docs'
  let mainContent = <StandardLayout {...props}>{children}</StandardLayout>

  if (location.pathname.match(/data-stories/)) {
    return (
      <DataStoryLayout {...props}>{children}</DataStoryLayout>
    )
  }

  if (isDocs) {
    mainContent = <DocsLayout {...props}>{children}</DocsLayout>
  }

  return (
    <div className='main-container'>
      <Header location={location} showSidebar={isDocs} />
      <div className='main-content'>
        {mainContent}
      </div>
    </div>
  )
}

export default IndexLayout
