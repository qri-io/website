import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import styled from '@emotion/styled'
import DocsColumns from '../components/docs-columns'
import ExternalLink from '../components/ExternalLink'
// import NextPrevious from '../components/NextPrevious'
import config from '../../config'

const Edit = styled('div')`
  padding: 1rem 1.5rem;
  text-align: right;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    text-decoration: none;
    color: #555;
    border: 1px solid rgb(211, 220, 228);
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s ease-out 0s;
    text-decoration: none;
    color: rgb(36, 42, 49);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: rgb(245, 247, 249);
    }
  }
`

export default class MDXRuntimeTest extends Component {
  render () {
    const { data } = this.props
    if (!data) {
      return null
    }
    const {
      mdx,
      site: {
        siteMetadata: { docsLocation, title }
      }
    } = data
    const gitHub = require('../components/images/github.svg')

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle
    const metaDescription = mdx.frontmatter.metaDescription
    let canonicalUrl = config.gatsby.siteUrl
    canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl
    canonicalUrl = canonicalUrl + mdx.fields.slug

    return (
      <DocsColumns {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null }
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? <meta name="description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="twitter:description" content={metaDescription} /> : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <h1 className={'title'}>
            {mdx.fields.title}
          </h1>
          <Edit className={'mobileView'}>
            <ExternalLink className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
              <img src={gitHub} alt={'Github logo'} /> Edit on GitHub
            </ExternalLink>
          </Edit>
        </div>
        <div className={'mainWrapper'}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </DocsColumns>
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
