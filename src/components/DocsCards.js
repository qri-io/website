import React from 'react'

import DocsCard from './DocsCard'

const DocsCards = ({ title, description, items, colorClass }) => {
  return (
    <div>
      <div className='mt-6 mb-5 font-semibold text-qrigray-400 text-sm uppercase tracking-wide'>{title}</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {items?.map((d) => (
          <DocsCard
            key={d.title}
            colorClass={colorClass}
            {...d}
          />
        ))}
      </div>
    </div>
  )
}

export default DocsCards
