// page for showing one transform snippet

import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import Snippet from '../../../components/snippets/Snippet'
import SnippetHeader from '../../../components/snippets/SnippetHeader'

import Link from '../../../components/Link'
import Button from '../../../components/Button'
import { fetchSnippet, deleteSnippet } from '../../../utils/snippet-crud'

const SnippetView = ({ id }) => {
  const [snippet, setSnippet] = useState()

  let showEdit = false
  if (typeof window !== 'undefined') {
    showEdit = !!localStorage.getItem('snippet-token')
  }

  useEffect(() => {
    async function fetchData (id) {
      const res = await fetchSnippet(id)
      setSnippet(res)
    }
    fetchData(id)
  }, [])

  const handleDelete = async () => {
    let token
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('snippet-token')
    }
    const res = await deleteSnippet(id, token)

    if (res.meta?.code === 200) {
      navigate('/docs/transform-snippets')
    }
  }

  return (
    <div className='px-5 md:px-10 lg:px-20 my-14 mx-auto' style={{ maxWidth: 1080 }}>
      <SnippetHeader showSearch />
      {snippet && (
        <Snippet snippet={snippet}/>
      )}
      {showEdit && (
        <>
          <Link to={`/docs/transform-snippets/${id}/edit`}><Button>Edit</Button></Link>
          <Button className='ml-4' type='secondary' onClick={handleDelete}>Delete</Button>
        </>
      )}
    </div>
  )
}

export default SnippetView
