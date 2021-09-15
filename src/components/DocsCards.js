import React from 'react'

import DocsCard from './DocsCard'

const DocsCards = ({ docsSectionInfo, items, titlePrefix = '' }) => {
  return (
    <>
      {items.map(({ url, title, description, items: childItems }) => {
        if (childItems.length) {
          return <DocsCards docsSectionInfo={docsSectionInfo} items={childItems} titlePrefix={title} />
        }
        return (
          <DocsCard
            key={title}
            docsSectionInfo={docsSectionInfo}
            title={title}
            description={description}
            url={url}
            titlePrefix={titlePrefix}
          />
        )
      })}
    </>
  )
}

export default DocsCards
