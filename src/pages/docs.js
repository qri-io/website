import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Tree from '../components/sidebar/tree'

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

const DocsPage = () => (
  <div className='container docs-page'>
    <Helmet>
      <title>Qri Docs</title>
      <meta name="title" content='Qri Docs' />
      <meta name="description" content={'Documentation for Qri Desktop and Qri CLI'} />
    </Helmet>
    <div className='docs-hero'>
      <div className='row'>
        <div className='col-12 col-md-6 col-lg-3 docs-title'>
          <h1>QRI DOCS</h1>
          <p>Version & publish datasets for great good!</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6 docs-feature-tile-container'>
          <Link to='/docs/getting-started/qri-desktop-quickstart'>
            <div className='docs-feature-tile'>
              <div className='row'>
                <div className='col-4'>
                  <img src='/img/graphics/desktop-abstract.png' />
                </div>
                <div className='col-8'>
                  <h2>QRI DESKTOP QUICKSTART</h2>
                  <p>create, clone, and publish your first dataset using qri desktop</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='col-12 col-md-6 docs-feature-tile-container'>
          <Link to='/docs/getting-started/qri-cli-quickstart'>
            <div className='docs-feature-tile dark'>
              <div className='row'>
                <div className='col-4'>
                  <img src='/img/graphics/cli-abstract.png' />
                </div>
                <div className='col-8'>
                  <h2>COMMAND LINE QUICKSTART</h2>
                  <p>take a tour of qri&apos;s command line interface</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <hr/>
    <div className='docs-contents'>
      <h2>CONTENTS</h2>
      <ContentLayout />
    </div>
  </div>
)

export default DocsPage
