import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import config from '../../config'

const RightSidebar = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
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
                  const { url, title } = innerItem
                  return (
                    <li className='text-qrigray-600 mb-2' key={i}>
                      <a href={url}>
                        {title}
                      </a>
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
          <div className='py-10 px-4 text-xs'>
            <ul className={'rightSideBarUL'}>
              <li className={'font-semibold text-black mb-4'}>CONTENTS</li>
              {finalNavItems}
            </ul>
          </div>
        )
      } else {
        return (
          <div className='border-l qrigray-100'>
            <ul></ul>
          </div>
        )
      }
    }}
  />
)

export default RightSidebar
