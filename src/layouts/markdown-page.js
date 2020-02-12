import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import Head from '../components/Head'
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
      <Head data={{
        title: metaTitle,
        description: metaDescription
      }} />
      <div className='container'>
        {jobHeading}
        {children}
      </div>
    </MDXProvider>
  )
}

export default MarkdownPageLayout
