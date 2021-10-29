import React from 'react'
import { connectStateResults } from 'react-instantsearch-dom'

const CustomResults = connectStateResults(
  ({ searchState, searchResults, children }) => {
    if (Object.keys(searchState).length === 0 || searchState.query === '') {
      return null
    }

    let content = (<div>No results have been found for {searchState.query}.</div>)

    if (searchResults && searchResults.nbHits !== 0) {
      content = children
    }

    return (
      <div className='border-t border-qrigray-200 mt-2 pt-4 flex-grow overflow-scroll'>
        {content}
      </div>
    )
  }
)

export default CustomResults
