import React from 'react'
import {
  connectSearchBox
} from 'react-instantsearch-dom'

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <input
      className='w-full outline-none text-xs font-bold tracking-wider'
      type="text"
      placeholder="Search Qri Docs"
      value={currentRefinement}
      autoFocus
      onChange={e => {
        refine(e.target.value)
      }}
    />
  )
})

export default CustomSearchBox
