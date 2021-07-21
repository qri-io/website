import React from 'react'
import { graphql } from 'gatsby'

import DocsColumns from '../components/DocsColumns'
import DocsContent from '../components/DocsContent'
import OutlineDocsContent from '../components/OutlineDocsContent'

import ApiDocs from '../components/ApiDocs'

import Header from '../components/Header'
// import NextPrevious from '../components/NextPrevious'

const DocsLayout = (props) => {
  let content = props.children
  let showSidebar = true

  if (props.pageContext.layout === 'docs') {
    content = <DocsContent {...props} />
  }

  if (props.pageContext.layout === 'outline-docs') {
    content = <OutlineDocsContent {...props} />
  }

  // special handling for API docs (redoc)
  if (props.path === '/docs/reference/qri-http-api') {
    content = <ApiDocs/>
  }

  // special handling for FAQ, a markdown docs page with no sidebar
  if (props.path === '/docs/faq') {
    showSidebar = false
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header {...props} />
      <DocsColumns {...props} sidebar={showSidebar}>
        {content}
      </DocsColumns>
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
  }
`

export default DocsLayout
