import React from 'react'
import CodeBlock from './codeBlock'
// import AnchorTag from './anchor'

export default {
  // h1: props => <h1 className='heading1' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  h2: props => <h2 className='text-black font-bold tracking-wide mb-6' {...props} />,
  // h3: props => <h3 className='heading3' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  // h4: props => <h4 className='heading4' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  // h5: props => <h5 className='heading5' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  // h6: props => <h6 className='heading6' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  code: CodeBlock,
  li: props => <li className='mb-3' {...props} />,
  p: props => <p className='mb-6' {...props} />,
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
