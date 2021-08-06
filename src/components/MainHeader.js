import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import HeaderLink from './HeaderLink'

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
        <Header border={false} {...props}>
          <>
            {mainHeaderLinks.map((headerLink, i) => (
              <HeaderLink key={i} data={headerLink} />
            ))}
          </>
        </Header>
      )
    }}
  />
)

export default MainHeader
