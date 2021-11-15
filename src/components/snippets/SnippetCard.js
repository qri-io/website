import React from 'react'
import Markdown from 'markdown-to-jsx'

import CodeBlock from '../mdxComponents/CodeBlock'
import AnchorTag from '../mdxComponents/AnchorTag'
import Link from '../Link'
import TagChips from '../TagChips'
import markdownComponents from '../mdxComponents'

export const markdownOptions = {
  overrides: {
    a: AnchorTag,
    p: markdownComponents.p
  }
}

const TransformSnippetCard = ({ snippet }) => {
  const { id, title, description, code, tags } = snippet
  return (
    <div
      key={title}
      className='bg-white rounded-lg mb-10 border border-qrigray-100'
    >
      <div className='px-5 py-5'>
        <Link to={`/docs/transform-snippets/${id}`}>
          <div className='font-bold text-lg mb-2.5'>{title}</div>
        </Link>
        <div className='text-xs mb-2.5 text-qrigray-400'>
          <Markdown options={markdownOptions}>{description}</Markdown>
        </div>
        <div>{tags && <TagChips tags={tags}/>}</div>
      </div>
      <CodeBlock containerClassName='p-5' className='language-python text-sm'>{code}</CodeBlock>
    </div>
  )
}

export default TransformSnippetCard
