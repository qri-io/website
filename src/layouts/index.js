import React, { useState } from 'react'
import SearchModal from '../components/search/SearchModal'

import DocsContentLayout from './DocsContentLayout'
import SnippetsLayout from './SnippetsLayout'
import DocsLandingPageLayout from './DocsLandingPageLayout'
import StandardLayout from './StandardLayout'
import Head from '../components/Head'

import '../../static/css/highlight.default.min.css'
import '../scss/style.scss'

// this is the top-level layout, which includes the header and main content area
// the regular gatsby (jsx) pages will use a standard layout
// docs pages have context.layout === 'docs' and will use the docs layout with sidebars

const IndexLayout = (props) => {
  const { children, location, pageContext } = props

  let style = { background: 'url("/img/new-docs/dot.svg")' }
  // dots background pattern is the default, don't show for legal pages
  if (location.pathname.includes('/legal')) {
    style = {}
  }

  let mainContent = <StandardLayout style={style} {...props}>{children}</StandardLayout>

  // documentation article layout, fixed docs header
  // used for both docs section pages and docs content
  if (pageContext.layout === 'docs' || pageContext.layout === 'docsSectionLandingPage') {
    mainContent = <DocsContentLayout onSearchClick={() => { setShowSearch(true) }} {...props}>{children}</DocsContentLayout>
  }

  // /docs  gets its own special layout that uses DocsHeader but is a long scroller
  if (location.pathname.match(/^\/docs\/?$/)) {
    mainContent = (
      <DocsLandingPageLayout onSearchClick={() => { setShowSearch(true) }} {...props}>
        {children}
      </DocsLandingPageLayout>
    )
  }

  // transform snippets gets the docs header but with bottom border
  if (location.pathname.includes('/transform-snippets')) {
    mainContent = <SnippetsLayout onSearchClick={() => { setShowSearch(true) }} {...props}>{children}</SnippetsLayout>
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
