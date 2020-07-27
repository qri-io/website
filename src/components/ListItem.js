import * as React from 'react'

const ListItem = ({ link, children }) => {
  let content = (
    <div className='card-body'>
      {children}
    </div>
  )

  if (link) {
    content = (
      <a href={link}>{content}</a>
    )
  }

  return (
    <div className='list-item card'>
      {content}
    </div>
  )
}

export default ListItem
