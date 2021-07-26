import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Head from '../components/Head'
import mdxComponents from '../components/mdxComponents/outline-docs'

const MarkdownPageLayout = (props) => {
  const { children, pageContext } = props
  const { metaTitle, metaDescription } = pageContext.frontmatter

  return (
    <MDXProvider components={mdxComponents}>
      <Head data={{
        title: metaTitle,
        description: metaDescription
      }} />
      <div className='py-14 px-16 text-qrigray-600 font-light flex-grow flex-shrink-0'>
        <div className={''}>
          <h1 className={'text-qritile-600 font-bold text-2xl mb-6'}>
            {metaTitle}
          </h1>
        </div>
        <div className={'mainWrapper'}>
          {children}
        </div>
      </div>
    </MDXProvider>
  )
}

export default MarkdownPageLayout
