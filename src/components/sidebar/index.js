import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import classNames from 'classnames'

import config from '../../../config.js'

import Tree from './tree'
import Icon from '../Icon'

const Sidebar = ({ location, mobile = false }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx(filter: {fileAbsolutePath: {regex: "\\/docs/"}}) {
          edges {
            node {
              fields {
                slug
                title
                description
              }
            }
          }
        }
      }
    `}
    render={({ allMdx, site }) => {
      const edges = allMdx.edges
      let title = 'DOCS'
      let colorClass = 'text-gray'

      const match = config.docsSections.find(d => location.pathname.includes(d.path))
      // filter edges, set title, color based on current section
      if (match) {
        title = match.title.toUpperCase()
        colorClass = match.colorClass

        return (
          <div className={classNames('hide-scrollbars bg-qrigray-100 py-5 md:py-10 px-5 md:pr-0 md:pl-10  text-qrigray-600 border-r qrigray-200 sticky overflow-y-scroll', {
            'text-xs': !mobile,
            'text-base': mobile
          })} style={{
            width: !mobile && 250,
            top: 75,
            height: 'calc(100vh - 75px)'
          }}>
            <ul>
              <li className='mb-4'>
                <Link to={match.path} className='flex items-center font-bold text-black' style={{ fontSize: 13 }}>
                  <Icon icon='docsRing' size='2xs' className={classNames('mr-2', colorClass)}/>
                  {title}
                </Link>
              </li>
              <Tree
                items={match.items}
                edges={edges}
              />
            </ul>
          </div>
        )
      }

      return null
    }}
  />
)

export default Sidebar
