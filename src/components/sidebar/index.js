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
      return (
        <div className='bg-backgroundgray p-10 text-xs text-contentgray font-light border-r border-separator'>
          <ul>
            <li className='mb-5'>
              <Link to='/docs'>
                DOCS
              </Link>
            </li>
            <Tree
              edges={allMdx.edges}
            />
          </ul>
        </div>
      )
    }}
  />
)

export default Sidebar
