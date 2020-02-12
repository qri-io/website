import React from 'react'
import { StaticQuery } from 'gatsby'

import JobRow from '../../components/JobRow'
import Head from '../../components/Head'

const JobsPage = () => (
  <div className='container jobs-page'>
    <h1>Jobs</h1>

    <p>A running list of job openings at Qri. Join our team! If you see it here, the job&apos;s still open.</p>

    <StaticQuery
      query={graphql`
      query {
        allMdx(filter: {fileAbsolutePath: {regex: "\\/jobs/job-/"}}) {
          edges {
            node {
              fields {
                slug
                weight
                jobTitle
                jobLocation
              }
            }
          }
        }
      }
    `}
      render={({ allMdx }) => {
        return (
          <>
            <Head data={{
              title: 'Jobs at Qri',
              description: 'A running list of job openings at Qri. Join our team! If you see it here, the job&apos;s still open.'
            }} />
            <ul className={'sideBarUL'}>
              {allMdx.edges.map((edge) => {
                const { slug, jobTitle, jobLocation } = edge.node.fields
                return (
                  <JobRow
                    key={slug}
                    title={jobTitle}
                    location={jobLocation}
                    team=''
                    link={slug}
                  />
                )
              })}
            </ul>
          </>
        )
      }}
    />
  </div>
)

export default JobsPage
