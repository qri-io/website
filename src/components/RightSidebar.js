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
                        {items && items.map(({ url, title: secondTierTitle, items }) => (
                          <li className='text-qrigray-400 hover:text-qripink transition-all duration-200 mb-2 ml-2 mt-1' key={title}>
                            <a href={url}>
                              {secondTierTitle}
                            </a>
                            {/* Only show third tier if title is 'Types' */}
                            {title === 'Types' && (
                              <ul>
                                {items && items.map(({ url, title: thirdTierTitle, items }) => (
                                  <li className='text-qrigray-400 hover:text-qripink transition-all duration-200 mb-2 ml-2 mt-1 text-xs' key={title}>
                                    <a href={url}>
                                      {thirdTierTitle}
                                    </a>
                                  </li>
                                ))
                                }
                              </ul>
                            )}
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
          <ul className={'rightSideBarUL'}>
            <li className={'font-semibold text-black mb-4'}>CONTENTS</li>
            {finalNavItems}
          </ul>
        )
      } else {
        return null
      }
    }}
  />

)

export default RightSidebar
