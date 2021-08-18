import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'

const MainHeader = (props) => (
  <StaticQuery
    query={
      graphql`
          query mainHeaderQuery {
            site {
              siteMetadata {
                mainHeaderLinks {
                  link
                  text
                }
              }
            }
          }
        `}
    render={(data) => {
      const {
        site: {
          siteMetadata: {
            mainHeaderLinks
          }
        }
      } = data
      return (
        <Header border={false} headerLinks={mainHeaderLinks} {...props} />
      )
    }}
  />
)

export default MainHeader
