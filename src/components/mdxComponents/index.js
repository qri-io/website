import React from 'react'
import CodeBlock from './codeBlock'
// import AnchorTag from './anchor'

export default {
  // h1: props => <h1 className='heading1' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  h2: props => <h2 className='text-black font-bold tracking-wide mb-6' {...props} />,
  h3: props => <h3 className='text-qrigray-900 font-semibold mb-4' {...props} />,
  h4: props => <h4 className='text-qrigray-900 font-medium mb-2' {...props} />,
  h5: props => <h5 className='text-qrigray-600 font-semibold mb-1' {...props} />,
  // h6: props => <h6 className='heading6' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  code: CodeBlock,
  li: props => <li className='mb-3' {...props} />,
  p: props => <p className='mb-6 text-sm' {...props} />,
  pre: props => <pre className='pre' {...props} />,
  strong: props => <strong className='font-semibold' {...props} />,
  ul: props => <ul className='mb-6' {...props} />
  // a: AnchorTag
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
}
