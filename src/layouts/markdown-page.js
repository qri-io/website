import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Helmet from 'react-helmet'
import mdxComponents from '../components/mdxComponents'

const MarkdownPageLayout = (props) => {
  const { children, pageContext } = props
  const { metaTitle, metaDescription } = pageContext.frontmatter
  return (
    <MDXProvider components={mdxComponents}>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null }
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? <meta name="description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
        {metaDescription ? <meta property="twitter:description" content={metaDescription} /> : null}
      </Helmet>
      <div className='container'>
        {children}
      </div>
    </MDXProvider>
  )
}

export default MarkdownPageLayout
