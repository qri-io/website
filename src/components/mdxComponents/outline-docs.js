import React from 'react'
import CodeBlock from './codeBlock'
// import AnchorTag from './anchor'

export default {
  // h1: props => <h1 className='heading1' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  h1: props => <h1 className='text-qrigray-900 font-semibold tracking-wide mt-12 mb-6 text-2xl' {...props} />,
  h2: props => <h2 className='text-qrigray-800 font-semibold mt-12 mb-6 text-xl' {...props} />,
  h3: props => <h3 className='text-qrigray-700 font-medium mt-12 mb-6 text-lg' {...props} />,
  h4: props => <h4 className='text-qrigray-600 font-medium mb-1' {...props} />,
  // h6: props => <h6 className='heading6' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  code: CodeBlock,
  li: props => <li className='mb-3' {...props} />,
  p: props => <p className='mb-6 text-sm' {...props} />,
  pre: props => <pre className='pre' {...props} />,
  strong: props => <strong className='font-semibold' {...props} />,
  ul: props => <ul className='mb-6' {...props} />,
  inlineCode: props => <code className='rounded border-solid border text-sm px-1 py-px bg-qrigray-100' {...props} />,
  // a: AnchorTag
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  table: props => <table className='text-sm table-auto mb-6' {...props} />,
  thead: props => <thead className='text-left bg-qrigray-100' {...props} />,
  th: props => <th className='border p-2 font-medium' {...props} />,
  tbody: props => <tbody className='' {...props} />,
  tr: props => <tr className='border' {...props} />,
  td: props => <td className='border p-2 align-top' {...props} />

}
