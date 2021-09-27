import React, { useEffect, useCallback } from 'react'
import { navigate, StaticQuery, graphql } from 'gatsby'

import {
  InstantSearch,
  Configure
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import CustomHits from './CustomHits'
import CustomSearchBox from './CustomSearchBox'
import CustomResults from './CustomResults'
import Icon from '../Icon'

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

// prevents search results from showing when the component first loads with an empty query
let firstLoad = true

const searchClient = {
  search (requests) {
    if (firstLoad === true) {
      firstLoad = false
      return
    }
    return algoliaClient.search(requests)
  }
}

const SearchModal = ({ onClose }) => {
  // close when the user presses escape key
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      onClose()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  // navigate and close when a hit is clicked
  const handleClickHit = (slug) => {
    navigate(slug)
    onClose()
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              docsSections {
                title
                path
                description
                colorClass
              }
            }
          }
        }
      `}
      render={({ site }) => {
        const { docsSections } = site.siteMetadata
        return (
          <div className='fixed z-30 inset-0 min-h-screen'>
            <div className='flex items-end justify-center h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 p-8" onClick={onClose} style={{
                  background: 'rgba(0, 0, 0, 0.25)'
                }}></div>
              </div>
              <div
                className='shadow-xl transform transition-all inline-block bg-white rounded-lg text-left flex flex-col p-5 mx-auto max-w-xl my-8'
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
                style={{
                  maxHeight: 'calc(100vh - 64px)'
                }}
              >
                <InstantSearch
                  indexName="Docs"
                  searchClient={searchClient}
                >
                  <Configure hitsPerPage={5} />
                  <div className='flex items-center'>
                    <Icon icon='search' className='mr-3' size='sm'/>
                    <div className='flex-grow'>
                      <CustomSearchBox/>
                    </div>
                  </div>
                  <div className='flex-shrink flex min-h-0'>
                    <CustomResults>
                      <CustomHits docsSections={docsSections} onClickHit={handleClickHit} />
                    </CustomResults>
                  </div>
                </InstantSearch>
              </div>
            </div>
          </div>
        )
      }}
    />

  )
}

export default SearchModal
