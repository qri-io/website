import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import classNames from 'classnames'

import Tree from './tree'
import Icon from '../Icon'

const Sidebar = ({ location, mobile = false }) => (
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
        allMdx(filter: {fileAbsolutePath: {regex: "\\/docs/"}}) {
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
        <div className={classNames('bg-qrigray-100 py-5 md:py-10 px-5 md:pr-0 md:pl-10  text-qrigray-600 font-light border-r qrigray-200 sticky overflow-y-scroll', {
          'text-xs': !mobile,
          'text-base': mobile
        })} style={{
          width: !mobile && 250,
          top: 75,
          height: 'calc(100vh - 75px)'
        }}>
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
