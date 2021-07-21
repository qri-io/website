import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'

import mdxComponents from './mdxComponents'
import RightSidebar from './RightSidebar'

import Head from '../components/Head'

const DocsContent = (props) => {
  const { data, location } = props
  if (!data) {
    return null
  }
  const {
    mdx,
    site: {
      siteMetadata: { docsLocation }
    }
  } = data

  const metaTitle = mdx.frontmatter.metaTitle
  const metaDescription = mdx.frontmatter.metaDescription
  return (
    <MDXProvider components={mdxComponents}>
      <div className='flex-grow flex-shrink'>
        <Head data={{
          title: metaTitle,
          description: metaDescription
        }} />
        <div className='py-14 pl-16 text-qrigray-600 font-light'>
          <div className={''}>
            <h1 className={'text-qritile-600 font-bold text-2xl mb-6'}>
              {mdx.fields.title}
            </h1>
          </div>
          <div className={'mainWrapper'}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </div>
      </div>
      <div className='h-full border-l border-qrigray-200 sticky top-0 ml-16' style={{
        minWidth: 222
      }}>
        <RightSidebar location={location} />
      </div>
    </MDXProvider>
  )
}

export default DocsContent
