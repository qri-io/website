import React from 'react'
import { graphql } from 'gatsby'

import DocsSectionLandingPage from '../components/DocsSectionLandingPage'

const DocsSectionLandingPageLayout = (props) => {
  const { data, pageContext } = props
  const { allMdx } = data

  const { sectionInfo, colorClass, breadcrumb } = pageContext
  const { crumbs } = breadcrumb
  // traverse config.docsSections to locate the match
  return (
    <DocsSectionLandingPage docsSectionInfo={sectionInfo} allMdx={allMdx} colorClass={colorClass} crumbs={crumbs} />
  )
}

export default DocsSectionLandingPageLayout

// pagequery to get data for this section
export const pageQuery = graphql`
  query {
    allMdx(filter: {fileAbsolutePath: {regex: "\\/docs/"}}) {
      edges {
        node {
          fields {
            slug
            title
            description
          }
        }
      }
    }
  }
`
