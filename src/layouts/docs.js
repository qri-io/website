import React, { Component } from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Head from '../components/Head'
import DocsColumns from '../components/docs-columns'
import ExternalLink from '../components/ExternalLink'
import Header from '../components/Header'
// import NextPrevious from '../components/NextPrevious'

export default class MDXRuntimeTest extends Component {
  render () {
    const { data } = this.props
    if (!data) {
      return null
    }
    const {
      mdx,
      site: {
        siteMetadata: { docsLocation }
      }
    } = data

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle
    const metaDescription = mdx.frontmatter.metaDescription
    // let canonicalUrl = config.gatsby.siteUrl
    // canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl
    // canonicalUrl = canonicalUrl + mdx.fields.slug

    return (
      <div className='flex flex-col h-screen'>
        <Header location={location} />
        <DocsColumns {...this.props}>
          <Head data={{
            title: metaTitle,
            description: metaDescription
          }} />
          <div className='py-14 pl-16 text-contentgray font-light'>
            <div className={''}>
              <h1 className={'text-turquoise font-bold text-2xl mb-6'}>
                {mdx.fields.title}
              </h1>
              {/*
                Edit on github button
                <div className={'mobileView'}>
                  <ExternalLink className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
                    <FontAwesomeIcon icon={faGithub} className='align-middle' />
                    <span className='gitBtnText align-middle'>Edit on GitHub</span>
                  </ExternalLink>
                </div>
              */}
            </div>
            <div className={'mainWrapper'}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </div>
        </DocsColumns>
      </div>
    )
  }
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
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`
