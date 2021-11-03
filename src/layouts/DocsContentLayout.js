import React from 'react'

import DocsColumns from '../components/DocsColumns'
import DocsContent from '../components/DocsContent'

import ApiDocs from '../components/ApiDocs'

import DocsHeader from '../components/DocsHeader'
// import NextPrevious from '../components/NextPrevious'

const DocsLayout = (props) => {
  let content = props.children
  let leftSidebar = true
  let rightSidebar = true

  if (props.pageContext.layout === 'docs') {
    content = <DocsContent {...props} />
  }

  // special handling for API docs (redoc)
  if (props.path === '/docs/reference/qri-http-api/json-api-spec') {
    content = <ApiDocs/>
    rightSidebar = false
  }

  // special handling for FAQ, a markdown docs page with no sidebar
  if (props.pageContext.faqPage) {
    leftSidebar = false
  }

  // don't show right sidebar on docs section landing pages
  if (props.pageContext.sectionInfo) {
    rightSidebar = false
  }

  return (
    <div className='docs-content-layout'>
      <DocsHeader {...props} />
      <DocsColumns {...props} leftSidebar={leftSidebar} rightSidebar={rightSidebar}>
        {content}
      </DocsColumns>
    </div>
  )
}

export default DocsLayout
