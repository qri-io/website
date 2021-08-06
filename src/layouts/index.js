import React, { useState } from 'react'
import SearchModal from '../components/search/SearchModal'

import DocsLayout from './docs'
import DocsLandingPageLayout from './DocsLandingPageLayout'
import StandardLayout from './standard'
import DataStoryLayout from './data-story'
import Head from '../components/Head'

import '../../static/css/highlight.default.min.css'
import '../scss/style.scss'

// this is the top-level layout, which includes the header and main content area
// the regular gatsby (jsx) pages will use a standard layout
// docs pages have context.layout === 'docs' and will use the docs layout with sidebars

const IndexLayout = (props) => {
  const { children, location } = props

  // data stories are special and need a fixed header
  if (location.pathname.match(/data-stories/)) {
    return (
      <DataStoryLayout {...props}>{children}</DataStoryLayout>
    )
  }

  let style = {}
  // special background on StandardLayout for the landing page
  if (location.pathname === '/') {
    style = { background: 'url("/img/new-docs/dot.svg")' }
  }

  let mainContent = <StandardLayout style={style} {...props}>{children}</StandardLayout>

  // documentation layout
  const isDocs = location.pathname.match(/docs/)
  if (isDocs) {
    mainContent = <DocsLayout onSearchClick={() => { setShowSearch(true) }} {...props}>{children}</DocsLayout>
  }

  // special handling for docs landing page
  if (location.pathname.match(/\/docs\/?$/)) {
    mainContent = (
      <DocsLandingPageLayout onSearchClick={() => { setShowSearch(true) }} {...props}>
        {children}
      </DocsLandingPageLayout>
    )
  }

  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className='main-container'>
      <Head data={{
        title: 'Qri',
        description: 'Qri is an open source version control and sharing system for datasets',
        image: 'https://qri.io/img/twitter_card_image.png',
        imageAlt: 'The Qri Logo',
        url: location.href
      }}/>
      {showSearch && <SearchModal onClose={() => { setShowSearch(false) }} />}
      <div className='main-content'>
        {mainContent}
      </div>
    </div>
  )
}

export default IndexLayout
