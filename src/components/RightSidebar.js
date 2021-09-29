import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import config from '../../config'

const RightSidebar = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx(filter: {fileAbsolutePath: {regex: "\\/docs/"}}) {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let finalNavItems
      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        allMdx.edges.map((item, index) => {
          let innerItems
          if (item !== undefined) {
            if ((item.node.fields.slug === location.pathname) || (config.gatsby.pathPrefix + item.node.fields.slug) === location.pathname) {
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, i) => {
                  const { url, title, items } = innerItem
                  return (
                    <li className='text-qrigray-600 my-3' key={i}>
                      <a href={url}>
                        {title}
                      </a>
                      <ul>
                        {items && items.map(({ url, title, items }) => (
                          <li className='text-qrigray-400 mb-2 ml-2 mt-1' key={title}>
                            <a href={url}>
                              {title}
                            </a>
                          </li>
                        ))
                        }
                      </ul>
                    </li>
                  )
                })
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems
          }
        })
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <div className='border-l border-qrigray-200 hidden lg:block flex-grow' style={{
            minWidth: 160
          }}>
            <div className='hide-scrollbars sticky overflow-y-scroll' style={{
              height: 'calc(100vh - 75px)',
              top: 75
            }}>
              <div className='py-10 px-4 text-xs'>
                <ul className={'rightSideBarUL'}>
                  <li className={'font-semibold text-black mb-4'}>CONTENTS</li>
                  {finalNavItems}
                </ul>
              </div>
            </div>
          </div>
        )
      } else {
        return null
      }
    }}
  />

)

export default RightSidebar
