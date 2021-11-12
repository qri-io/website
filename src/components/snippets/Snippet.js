import React from 'react'
import Markdown from 'markdown-to-jsx'

import CodeBlock from '../mdxComponents/CodeBlock'
import { markdownOptions } from './SnippetCard'
import TagChips from '../TagChips'

const Snippet = ({ snippet }) => (
  <>
    <div className='text-qritile-600 font-bold text-2xl mb-3'>{snippet.title}</div>
    <div className='text-qrigray-400 text-sm mb-2'>
      <Markdown options={markdownOptions}>{snippet.description}</Markdown>
    </div>
    <div className='mb-6'>
      <TagChips tags={snippet.tags} />
    </div>
    <div className='rounded-lg mb-10 overflow-hidden'>
      <CodeBlock containerClassName='p-5' className='language-python text-sm'>{snippet.code}</CodeBlock>
    </div>
  </>

)

export default Snippet
