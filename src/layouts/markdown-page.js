import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Head from '../components/Head'
import mdxComponents from '../components/mdxComponents'

const MarkdownPageLayout = (props) => {
  const { children, pageContext } = props
  const { metaTitle, metaDescription } = pageContext.frontmatter

  return (
    <MDXProvider components={mdxComponents}>
      <Head data={{
        title: metaTitle,
        description: metaDescription
      }} />
      <div className='px-5 py-8 md:py-14 md:px-16 text-qrigray-600 font-light flex-grow w-full max-w-3xl mx-auto'>
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
