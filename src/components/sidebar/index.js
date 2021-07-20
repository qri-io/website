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
        <div className='bg-qrigray-100 py-10 pl-10 text-xs text-qrigray-600 font-light border-r qrigray-100'>
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
