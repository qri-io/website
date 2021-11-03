import React from 'react'
import {
  connectSearchBox
} from 'react-instantsearch-dom'

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <input
      className='w-full focus:ring-transparent border-0 outline-none text-sm font-bold tracking-wider'
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
