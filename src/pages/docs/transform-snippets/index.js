// page for displaying/searching transform snippet tiles

import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { useQueryParam, StringParam } from 'use-query-params'

import SnippetHeader from '../../../components/snippets/SnippetHeader'
import SnippetCard from '../../../components/snippets/SnippetCard'
import SearchBox from '../../../components/SearchBox'
import Link from '../../../components/Link'
import Button from '../../../components/Button'
import { fetchSnippets, searchSnippets } from '../../../utils/snippet-crud'

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([])
  const [q, setQ] = useQueryParam('q', StringParam)

  const showEdit = !!localStorage.getItem('snippet-token')

  async function fetchData () {
    if (q) {
      const snippetsResponse = await searchSnippets({ q })
      setSnippets(snippetsResponse)
    } else {
      const snippetsResponse = await fetchSnippets()
      setSnippets(snippetsResponse)
    }
  }

  useEffect(() => {
    fetchData()
  }, [q])

  const handleSearchChange = async (q) => {
    setQ(q)
  }

  const handleClearClick = () => {
    setQ('')
  }

  return (
    <div className='px-5 md:px-10 lg:px-20 my-14 mx-auto' style={{ maxWidth: 1080 }}>
      <SnippetHeader topLevel />
      <div className='flex items-center mb-6'>
        <div className='text-qrinavy-700 font-black text-3xl tracking-wide flex-grow'>Transform Snippets</div>
        {showEdit && <Link to={'/docs/transform-snippets/new'}><Button>New</Button></Link>}
      </div>
      <div className='mb-5'>
        <SearchBox placeholder='filter snippets' size='lg' onChange={handleSearchChange} value={q} />
      </div>
      <div className='mb-5 flex'>
        <div className='flex-grow'>
          {!q && <>Showing all {snippets.length} snippets</>}
          {q && <>Showing {snippets.length} snippets matching &apos;{q}&apos; </>}
        </div>
        <div>
          {q && <Link onClick={handleClearClick}>Clear</Link>}
        </div>
      </div>
      {
        snippets.length > 0 && (
          <Masonry
            breakpointCols={3}
            className='flex -ml-7 w-auto'
            columnClassName='pl-7 bg-clip-padding'>
            {snippets.map((snippet) => <SnippetCard key={snippet.title} snippet={snippet} />)}
          </Masonry>
        )
      }
    </div>
  )
}

export default SnippetsPage
