import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import mdxComponents from '../components/mdxComponents'

const MarkdownPageLayout = (props) => {
  const { children, pageContext } = props
  const { metaTitle, metaDescription, jobTitle, jobLocation } = pageContext.frontmatter

  let jobHeading = null

  if (jobTitle && jobLocation) {
    jobHeading = (
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='job-header'>
            <h2>{jobTitle}</h2>
            <p>{jobLocation}</p>
          </div>
        </div>
        <div className='col-12 col-md-6 mt-2 mt-md-5 text-left text-md-right'>
          <Link to='/jobs/apply'>
            <div className='btn btn-primary'>APPLY NOW</div>
          </Link>
        </div>
      </div>
    )
  }
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
        {jobHeading}
        {children}
      </div>
    </MDXProvider>
  )
}

export default MarkdownPageLayout
