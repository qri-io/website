import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

import Icon from './Icon'
import DocsContentWide from './DocsContentWide'

const DocsSectionLandingPage = ({ docsSectionInfo, allMdx }) => (
  <DocsContentWide>
    { docsSectionInfo && (
      <div className='text-qrigray-600 font-light'>
        <div className={classNames('font-bold text-2xl mb-6', docsSectionInfo.colorClass)}>{docsSectionInfo.text}</div>
        <div className={classNames('font-bold text-lg text-black mb-4')}>{docsSectionInfo.subtitle}</div>
        <div className={classNames('mb-4')}>{docsSectionInfo.description}</div>
        <div className='grid grid-cols-3 gap-4'>
          {allMdx.edges.map(({ node }) => {
            const { metaTitle, metaDescription } = node.frontmatter
            return (
              <Link key={metaTitle} to={node.fields.slug}>
                <div
                  className='rounded-lg border-solid border border-qrigray-100 box-border px-4 py-3'
                >
                  <Icon icon='docsRing' size='2xs' className={classNames('mb-2', docsSectionInfo.colorClass)} />
                  <div className='font-bold text-sm text-black mb-2'>{metaTitle}</div>
                  <div className='text-xs'>{metaDescription}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )}
  </DocsContentWide>
)

export default DocsSectionLandingPage
