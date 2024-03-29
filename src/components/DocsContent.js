import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'

import mdxComponents from './mdxComponents'
import DocsFooter from './DocsFooter'

import Head from '../components/Head'
import BreadCrumbs from '../components/BreadCrumbs'
import RightSidebar from '../components/RightSidebar'

const DocsContent = (props) => {
  const { data, location } = props
  if (!data) {
    return null
  }
  const {
    mdx
  } = data

  const metaTitle = mdx.frontmatter.metaTitle
  const metaDescription = mdx.frontmatter.metaDescription

  const { crumbs } = props.pageContext.breadcrumb

  return (
    <MDXProvider components={mdxComponents}>
      <div className='flex-grow flex-shrink flex flex-col min-w-0'>
        <Head data={{
          title: metaTitle,
          description: metaDescription
        }} />
        <div className='px-5 py-8 md:py-14 md:px-16 text-qrigray-600 font-light flex-grow w-full max-w-3xl mx-auto'>
          <div className='mb-8'>
            <BreadCrumbs crumbs={crumbs} />
          </div>
          <div className={''}>
            <h1 className={'text-qritile-600 font-bold text-2xl mb-6'}>
              {mdx.fields.title}
            </h1>
          </div>
          <div className='lg:hidden text-sm mb-10'>
            <RightSidebar location={location} />
          </div>
          <div className={'mainWrapper'}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </div>
        <div className='flex-grow-0'>
          <DocsFooter />
        </div>
      </div>
    </MDXProvider>
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

export default DocsContent
