import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import classNames from 'classnames'

import Tree from './tree'
import Icon from '../Icon'

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
      let colorClass = 'text-gray'

      // filter the edges based on the current docs section
      if (location.pathname.includes('/guides')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/guides/'))
        title = 'GUIDES'
        skipFirstLevel = true
        colorClass = 'text-qripink-600'
      }

      if (location.pathname.includes('/tutorials')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/tutorials/'))
        title = 'TUTORIALS'
        skipFirstLevel = true
        colorClass = 'text-qriorange-600'
      }

      if (location.pathname.includes('/concepts')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/concepts/'))
        title = 'CONCEPTS'
        skipFirstLevel = true
        colorClass = 'text-qrigreen-600'
      }

      if (location.pathname.includes('/reference')) {
        edges = allMdx.edges.filter(d => d.node.fields.slug.includes('/reference/'))
        title = 'REFERENCE'
        skipFirstLevel = true
        colorClass = 'text-qrinavy-300'
      }

      return (
        <div className='bg-qrigray-100 py-10 pl-10 text-xs text-qrigray-600 font-light border-r qrigray-200 h-full'>
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
