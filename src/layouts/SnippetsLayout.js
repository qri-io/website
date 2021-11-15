import React from 'react'
import DocsHeader from '../components/DocsHeader'

const SnippetsLayout = (props) => {
  return (
    <div className='snippets-layout'>
      <DocsHeader {...props} />
      {props.children}
    </div>
  )
}

export default SnippetsLayout
