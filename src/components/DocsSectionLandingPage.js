import React from 'react'
import classNames from 'classnames'

import DocsContentWide from './DocsContentWide'
import { calculateTreeData } from './sidebar/tree'
import DocsCards from './DocsCards'

const DocsSectionLandingPage = ({ docsSectionInfo, allMdx }) => {
  const tree = calculateTreeData(allMdx.edges)
  const groups = tree.items[0].items[0].items

  return (
    <DocsContentWide>
      { docsSectionInfo && (
        <div className='text-qrigray-600 font-light'>
          <div className={classNames('font-black text-3xl mb-6', docsSectionInfo.colorClass)}>{docsSectionInfo.text}</div>
          <div className={classNames('mb-4 text-sm')}>{docsSectionInfo.description}</div>
          {groups.map(({ label, items, title }) => (
            <div className='' key={label}>
              <div className='mt-6 mb-5 font-semibold text-qrigray-400 text-xs'>{title}</div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <DocsCards docsSectionInfo={docsSectionInfo} items={items} />
              </div>
            </div>
          ))}
        </div>
      )}
    </DocsContentWide>
  )
}

export default DocsSectionLandingPage
