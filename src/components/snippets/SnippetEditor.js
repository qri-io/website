// rudimentary editor for transform snippets
// used for both creating new snippets and editing existing snippets

import React, { useState } from 'react'
import { navigate } from 'gatsby'
import MultipleValueTextInput from 'react-multivalue-text-input'

import Button from '../Button'
import { updateSnippet, createSnippet } from '../../utils/snippet-crud'

const SnippetEditor = ({ snippet }) => {
  const [tags, setTags] = useState([])

  const editing = !!snippet

  const handleSubmit = async (e) => {
    e.preventDefault()

    let token
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('snippet-token')
    }

    const id = e.target.elements.id.value

    const body = {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      tags: tags,
      code: e.target.elements.code.value
    }

    if (editing) {
      const res = await updateSnippet(id, body, token)

      if (res.meta?.code === 200) {
        navigate(`/docs/transform-snippets/${id}`)
      }
    } else {
      const res = await createSnippet(body, token)

      if (res.meta?.code === 200) {
        navigate(`/docs/transform-snippets/${id}`)
      }
    }
  }

  const handleTagChange = (item, allItems) => {
    setTags(allItems)
  }

  return (
    <div className='max-w-lg mx-auto'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='id'
          placeholder="Snippet Title"
          className="text-sm w-full"
          defaultValue={snippet?.id}
          hidden
        />
        <label className="block mb-4">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            name='title'
            placeholder="Snippet Title"
            className="text-sm w-full"
            defaultValue={snippet?.title}
          />
        </label>
        <label className="block text-left mb-4">
          <span className="text-gray-700">Description</span>
          <textarea
            name='description'
            className="form-textarea mt-1 block w-full text-sm"
            rows="3"
            placeholder="Add markdown for the snippet description"
            defaultValue={snippet?.description}
          ></textarea>
        </label>
        <label className="block text-left mb-4">
          <span className="text-gray-700">Tags</span>
          <MultipleValueTextInput
            onItemAdded={handleTagChange}
            onItemDeleted={handleTagChange}
            name="item-input"
            placeholder="Tags"
            values={snippet?.tags}
          />
        </label>
        <label className="block text-left mb-4">
          <span className="text-gray-700">Code</span>
          <textarea
            name='code'
            className="form-textarea text-sm mt-1 block w-full"
            rows="10"
            placeholder="Code"
            defaultValue={snippet?.code}
          ></textarea>
        </label>
        <Button submit>Submit</Button>
      </form>
    </div>
  )
}

export default SnippetEditor
