import React from 'react'
import { graphql } from 'gatsby'

import DocsColumns from '../components/DocsColumns'
import DocsContent from '../components/DocsContent'

import ApiDocs from '../components/ApiDocs'

import DocsHeader from '../components/DocsHeader'
// import NextPrevious from '../components/NextPrevious'

const DocsLayout = (props) => {
  let content = props.children
  let showSidebar = true

  if (props.pageContext.layout === 'docs') {
    content = <DocsContent {...props} />
  }

  // special handling for API docs (redoc)
  if (props.path === '/docs/reference/qri-http-api/json-api-spec') {
    content = <ApiDocs/>
  }

  // special handling for FAQ, a markdown docs page with no sidebar
  if (props.path === '/docs/faq') {
    showSidebar = false
  }

  return (
    <>
      <DocsHeader {...props} />
      <DocsColumns {...props} sidebar={showSidebar}>
        {content}
      </DocsColumns>
    </>
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
