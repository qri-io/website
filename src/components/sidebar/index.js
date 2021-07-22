import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import classNames from 'classnames'

import Tree from './tree'
import Icon from '../Icon'

const Sidebar = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            docsSections {
              text
              link
              subtitle
              description
              colorClass
            }
          }
        }
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
    render={({ allMdx, site }) => {
      // here we can
      let edges = allMdx.edges
      let skipFirstLevel = false
      let title = 'DOCS'
      let colorClass = 'text-gray'

      const match = site.siteMetadata.docsSections.find(d => location.pathname.includes(d.link))

      // filter edges, set title, color based on current section
      if (match) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes(match.link))
        title = match.text.toUpperCase()
        skipFirstLevel = true
        colorClass = match.colorClass
      }

      return (
        <div className='bg-qrigray-100 py-10 pl-10 text-xs text-qrigray-600 font-light border-r qrigray-200 min-h-full'>
          <ul>
            <li className='mb-5'>
              <Link to='/docs' className='flex items-center'>
                <Icon icon='docsRing' size='2xs' className={classNames('mr-2', colorClass)}/>
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
