import React, { useEffect, useCallback } from 'react'
import { navigate } from 'gatsby'
import {
  InstantSearch,
  Hits,
  Configure,
  Highlight,
  connectStateResults,
  connectSearchBox
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import Icon from './Icon'

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

// a search input wired into InstantSearch state
const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <input
      className='w-full outline-none'
      type="text"
      placeholder="Search"
      value={currentRefinement}
      autoFocus
      onChange={e => {
        refine(e.target.value)
      }}
    />
  )
})

// wrapper to show "no results for X" OR nothing OR results
const Results = connectStateResults(
  ({ searchState, searchResults, children }) => {
    if (Object.keys(searchState).length === 0 || searchState.query === '') {
      return null
    }

    return (
      searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : (
        <div>No results have been found for {searchState.query}.</div>
      )
    )
  }
)

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

  // UI for search results
  const Hit = ({ hit }) => {
    return (
      <div onClick={() => { handleClickHit(hit.slug) }}>
        <div className='bg-qrigray-100 rounded px-6 py-3 mb-2 hover:bg-qritile-600 hover:text-white cursor-pointer'>
          <div className='text-sm font-medium mb-1'><Highlight attribute="metaTitle" hit={hit} /></div>
          <div className='text-xs text-qrigray-600 font-light'><Highlight attribute="metaDescription" hit={hit} /></div>
        </div>
      </div>
    )
  }

  return (
    <div className='fixed z-20 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 p-8" onClick={onClose} style={{
            background: 'rgba(0, 0, 0, 0.25)'
          }}></div>
        </div>
        <div
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-xl flex flex-col mx-auto'
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline">
          <InstantSearch
            indexName="Docs"
            searchClient={searchClient}
          >
            <Configure hitsPerPage={5} />
            <div className='flex p-4 border-b border-qrigray-200'>
              <Icon icon='search' className='mr-2'/>
              <div className='flex-grow'>
                <CustomSearchBox/>
              </div>
            </div>
            <div className='p-4'>
              <Results>
                <Hits hitComponent={Hit}/>
              </Results>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
