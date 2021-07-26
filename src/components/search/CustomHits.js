import React from 'react'
import classNames from 'classnames'
import {
  Highlight,
  connectHits
} from 'react-instantsearch-dom'

import Link from '../Link'
import Icon from '../Icon'

const CustomHits = connectHits(({ hits, docsSections, onClickHit }) => {
  // process hits, grouping into sections
  // expects all hits to have a slug that starts with '/docs/'

  const groupedHits = {}

  // make an array of the section ids
  const docsSectionIds = docsSections.map(d => d.id)

  // make an empty array in groupedHits for each section
  docsSectionIds.forEach((id) => {
    groupedHits[id] = []
  })

  // push each hit to the correct group
  if (hits) {
    hits.forEach((hit) => {
      const sectionId = hit.slug.split('/')[2]

      if (docsSectionIds.includes(sectionId)) {
        groupedHits[sectionId] = [
          ...groupedHits[sectionId],
          hit
        ]
      }
    })
  }

  return (
    <>
      {
        docsSectionIds.map((docsSectionId) => {
          const hits = groupedHits[docsSectionId]
          const { colorClass } = docsSections.find(d => d.id === docsSectionId)

          if (hits.length) {
            return (
              <div key={docsSectionId} className='mb-3'>
                <div className='mb-1'>
                  <Link to='/docs' className='flex items-center'>
                    <Icon icon='docsRing' size='2xs' className={classNames('mr-2', colorClass)}/>
                    <div className='uppercase text-qrigray-600 font-bold tracking-wider' style={{
                      fontSize: 10
                    }}>{docsSectionId}</div>
                  </Link>
                </div>
                <ol>
                  {hits.map((hit, i) => (
                    <div key={i} onClick={() => { onClickHit(hit.slug) }}>
                      <div className='text-xs font-bold rounded px-3 py-3 hover:bg-qrigray-100 cursor-pointer'>
                        <div className='text-qrigray-600 font-bold mb-1 tracking-wider hit-title'><Highlight attribute="metaTitle" hit={hit} /></div>
                        <div className='text-qrigray-400 font-light hit-description'><Highlight attribute="metaDescription" hit={hit} /></div>
                      </div>
                    </div>
                  ))}
                </ol>
              </div>
            )
          }

          return null
        })
      }
    </>
  )
})

export default CustomHits
