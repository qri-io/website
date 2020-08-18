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

const RapidocPage = () => (
  <div className='container docs-page'>
    <Head data={{
      title: 'openAPI Rapiddoc',
      description: 'todo(rusty)'
    }} />
    <Helmet>
      <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
    </Helmet>
    <rapi-doc
      spec-url="/open_api_3.yaml"
      allow-server-selection = 'true'
      show-header="false"
      render-style="read"
      allow-try="true"
      allow-api-list-style-selection ='false'
    > </rapi-doc>

    <hr/>
    <div className='docs-contents'>
      <h2>CONTENTS</h2>
      <ContentLayout />
    </div>
  </div>
)

export default RapidocPage
