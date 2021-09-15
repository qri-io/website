import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import JobRow from '../../components/JobRow'
import Head from '../../components/Head'
import ExternalLink from '../../components/ExternalLink'

const JobsPage = () => (
  <div className='container jobs-page'>
    <Head data={{
      title: 'Jobs at Qri',
      description: 'A running list of job openings at Qri. Join our team! If you see it here, the job&apos;s still open.'
    }} />

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
                jobTitle
                jobLocation
              }
            }
          }
        }
      }
    `}
      render={({ allMdx }) => {
        if (allMdx.edges.length) {
          return (
            <ul className='sideBarUL py-5'>
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
          )
        }

        return (
          <div className="alert alert-info py-3 my-5" role="alert">
            <strong>qri has no (defined) open positions at this time</strong>
            <br/>
            <br/>
            We’re always looking for great talent, if you’re interested in a position at Qri, please jump in <ExternalLink to='https://discordapp.com/invite/thkJHKj'>our Discord</ExternalLink>, or <a href='mailto:hello@qri.io'>email us</a>.
          </div>
        )
      }}
    />
  </div>
)

export default JobsPage
