import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'

const DocsHeader = (props) => (
  <StaticQuery
    query={
      graphql`
          query docsHeaderQuery {
            site {
              siteMetadata {
                docsHeaderLinks {
                  link
                  text
                  colorClass
                }
              }
            }
          }
        `}
    render={(data) => {
      const {
        site: {
          siteMetadata: {
            docsHeaderLinks
          }
        }
      } = data
      return (
        <Header headerLinks={docsHeaderLinks} sticky border {...props}/>
      )
    }}
  />
)

export default DocsHeader
