// page for creating a new transform snippet

import React from 'react'

import SnippetHeader from '../../../components/snippets/SnippetHeader'
import SnippetEditor from '../../../components/snippets/SnippetEditor'

const NewSnippetPage = () => (
  <div className='px-5 md:px-10 lg:px-20 my-14 mx-auto' style={{ maxWidth: 1080 }}>
    <SnippetHeader />
    <SnippetEditor />
  </div>
)

export default NewSnippetPage
