import React from 'react'

import DocsLayout from './docs'
import StandardLayout from './standard'
import DataStoryLayout from './data-story'
import Head from '../components/Head'
import Header from '../components/Header'

import 'bootstrap/dist/css/bootstrap.css'
import '../../static/css/highlight.default.min.css'
import '../scss/style.scss'

// this is the top-level layout, which includes the header and main content area
// the regular gatsby (jsx) pages will use a standard layout
// docs pages have context.layout === 'docs' and will use the docs layout with sidebars

const IndexLayout = (props) => {
  const { children, location, pageContext } = props

  // data stories are special and need a fixed header
  if (location.pathname.match(/data-stories/)) {
    return (
      <DataStoryLayout {...props}>{children}</DataStoryLayout>
    )
  }

  const isDocs = pageContext.layout === 'docs'
  let mainContent = <StandardLayout {...props}>{children}</StandardLayout>

  if (isDocs) {
    mainContent = <DocsLayout {...props}>{children}</DocsLayout>
  }

  return (
    <div className='main-container'>
      <Head data={{
        title: 'Qri',
        description: 'Qri is an open source version control and sharing system for datasets',
        image: 'https://qri.io/img/twitter_card_image.png',
        imageAlt: 'The Qri Logo',
        url: location.href
      }}/>
      <Header location={location} showSidebar={isDocs} />
      <div className='main-content'>
        {mainContent}
      </div>
    </div>
  )
}

export default IndexLayout
