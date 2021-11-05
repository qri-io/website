import React from 'react'

import DocsColumns from '../components/DocsColumns'
import DocsHeader from '../components/DocsHeader'

const DocsLayout = (props) => {
  // let content = props.children
  let leftSidebar = true
  let rightSidebar = true

  // don't show the right sidebar if this is the api docs page
  if (props.pageContext.apiDocsPage) {
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
        {props.children}
      </DocsColumns>
    </div>
  )
}

export default DocsLayout
