import React from 'react'
import { graphql } from 'gatsby'

import DocsSectionLandingPage from '../components/DocsSectionLandingPage'

const DocsSectionLandingPageLayout = (props) => {
  const { location, data } = props
  const { site, allMdx } = data

  const docsSectionInfo = site.siteMetadata.docsSections.find((d) => d.link === location.pathname)
  return (
    <DocsSectionLandingPage docsSectionInfo={docsSectionInfo} allMdx={allMdx} />
  )
}

export default DocsSectionLandingPageLayout

// pagequery to get data for this section
export const pageQuery = graphql`
  query($filePathRegex: String!) {
    site {
      siteMetadata {
        docsSections {
          text
          link
          subtitle
          description
          colorClass
        }
      }
    }
    allMdx(filter: { fileAbsolutePath: { regex: $filePathRegex }}) {
      edges {
        node {
          fields {
            id
            slug
            title
            description
          }
        }
      }
    }
  }
`
