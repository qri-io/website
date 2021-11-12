import React from 'react'

const TagChips = ({ tags }) => {
  return (
    <>
      {tags.map((tag, i) => (
        <div key={i} className='text-gray-400 text-xs inline-block border border-qrigray-400 rounded-md px-1.5 py-0.5 mr-1 mb-1'>{tag}</div>
      ))}
    </>
  )
}

export default TagChips
