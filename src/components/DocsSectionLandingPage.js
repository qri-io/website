import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'

import DocsContentWide from './DocsContentWide'
import { calculateTreeData } from './sidebar/tree'
import DocsCards from './DocsCards'
import BreadCrumbs from '../components/BreadCrumbs'

const DocsSectionLandingPage = (props) => {
  const { data, pageContext } = props
  const { allMdx } = data

  const { sectionInfo, colorClass, breadcrumb } = pageContext
  const { crumbs } = breadcrumb
  // traverse config.docsSections to locate the match
  return (
    <DocsSectionPage docsSectionInfo={sectionInfo} allMdx={allMdx} colorClass={colorClass} crumbs={crumbs} />
  )
}

export default DocsSectionLandingPage

const DocsSectionPage = ({ docsSectionInfo, allMdx, colorClass, crumbs }) => {
  const tree = calculateTreeData(docsSectionInfo.items, allMdx.edges)

  const topLevelItems = tree.filter(d => !d.items)
  const groups = tree.filter(d => d.items)

  return (
    <DocsContentWide>
      { docsSectionInfo && (
        <div className='text-qrigray-600 font-light'>
          <BreadCrumbs crumbs={crumbs} />
          <div className={classNames('font-black text-3xl mb-6 tracking-wide', colorClass)}>{docsSectionInfo.title}</div>
          <div className={classNames('mb-4 text-qrigray-700')}>{docsSectionInfo.description}</div>
          {
            topLevelItems && <DocsCards items={topLevelItems} colorClass={colorClass} />
          }
          {
            groups.map((d) => (
              <DocsCards key={d.title} {...d} colorClass={colorClass} />
            ))
          }
        </div>
      )}
    </DocsContentWide>
  )
}

// pagequery to get data for this section
export const pageQuery = graphql`
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
`
