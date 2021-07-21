import React from 'react'
import Tree from './tree'
import { StaticQuery, Link, graphql } from 'gatsby'

const Sidebar = ({ location }) => (
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
      // here we can
      let edges = allMdx.edges
      let skipFirstLevel = false
      let title = 'DOCS'

      // filter the edges based on the current docs section
      if (location.pathname.includes('/guides')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/guides/'))
        title = 'GUIDES'
        skipFirstLevel = true
      }

      if (location.pathname.includes('/tutorials')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/tutorials/'))
        title = 'TUTORIALS'
        skipFirstLevel = true
      }

      if (location.pathname.includes('/concepts')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/concepts/'))
        title = 'CONCEPTS'
        skipFirstLevel = true
      }

      if (location.pathname.includes('/reference')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/reference/'))
        title = 'REFERENCE'
        skipFirstLevel = true
      }

      return (
        <div className='bg-qrigray-100 py-10 pl-10 text-xs text-qrigray-600 font-light border-r qrigray-200 h-full'>
          <ul>
            <li className='mb-5'>
              <Link to='/docs'>
                {title}
              </Link>
            </li>
            <Tree
              edges={edges}
              skipFirstLevel={skipFirstLevel}
            />
          </ul>
        </div>
      )
    }}
  />
)

export default Sidebar
