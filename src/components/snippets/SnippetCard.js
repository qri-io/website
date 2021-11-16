import React from 'react'
import Markdown from 'markdown-to-jsx'

import CodeBlock from '../mdxComponents/CodeBlock'
import AnchorTag from '../mdxComponents/AnchorTag'
import Link from '../Link'
import TagChips from '../TagChips'
import Icon from '../Icon'
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
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <Icon icon='docsRing' size='3xs' className='mr-2 text-qrinavy-700 -mt-0.5'/>
            </div>
            <div className='font-bold text-black mb-2 tracking-wide'>{title}</div>
          </div>
        </Link>
        <div className='text-xs mb-2.5 text-qrigray-400'>
          <Markdown options={markdownOptions}>{description}</Markdown>
        </div>
        <div>{tags && <TagChips tags={tags}/>}</div>
      </div>
      <CodeBlock id={id} containerClassName='p-5' className='language-python text-sm' copyable>{code}</CodeBlock>
    </div>
  )
}

export default TransformSnippetCard
