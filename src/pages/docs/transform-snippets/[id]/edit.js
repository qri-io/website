// page for editing a transform snippet

import React, { useEffect, useState } from 'react'

import SnippetHeader from '../../../../components/snippets/SnippetHeader'
import SnippetEditor from '../../../../components/snippets/SnippetEditor'

const SnippetView = ({ id }) => {
  const [snippet, setSnippet] = useState()

  useEffect(() => {
    async function fetchSnippet (id) {
      const rawResponse = await fetch(`https://rosebud-api.qri.cloud/snippets/${id}`)
      const { data } = await rawResponse.json()
      setSnippet(data)
    }
    fetchSnippet(id)
  }, [])

  return (
    <div className='px-5 md:px-10 lg:px-20 my-14 mx-auto' style={{ maxWidth: 1080 }}>
      <SnippetHeader />
      {snippet && (
        <SnippetEditor snippet={snippet}/>
      )}
    </div>
  )
}

export default SnippetView
