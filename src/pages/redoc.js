import React from 'react'
import Head from '../components/Head'
import { StaticQuery, graphql } from 'gatsby'
import Tree from '../components/sidebar/tree'
import { Helmet } from 'react-helmet'

const ContentLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
                weight
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <>
          <ul className={'sideBarUL'}>
            <Tree
              edges={allMdx.edges}
            />
          </ul>
        </>
      )
    }}
  />
)

const RedocPage = () => (
  <div className='container docs-page'>
    <Head data={{
      title: 'openAPI redoc',
      description: 'todo(rusty)'
    }} />
    <Helmet>
      <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js"> </script>
    </Helmet>
    <redoc spec-url="/open_api_3_cut_errors.yaml"></redoc>

    <hr/>
    <div className='docs-contents'>
      <h2>CONTENTS</h2>
      <ContentLayout />
    </div>
  </div>
)

export default RedocPage
