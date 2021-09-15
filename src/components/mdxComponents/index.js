import React from 'react'
import CodeBlock from './codeBlock'
// import AnchorTag from './anchor'

export default {
  h1: props => <h1 className='text-black font-bold mt-8 mb-4 text-xl' {...props} />,
  // h1: props => <h1 className='heading1' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  h2: props => <h2 className='text-black text-lg font-semibold tracking-wide mt-8 mb-4 text-lg' {...props} />,
  h3: props => <h3 className='text-qrigray-900 font-semibold mt-6 mb-3' {...props} />,
  h4: props => <h4 className='text-qrigray-900 font-medium mt-6 mb-3 text-sm' {...props} />,
  h5: props => <h5 className='text-qrigray-600 font-semibold mb-1' {...props} />,
  // h6: props => <h6 className='heading6' id={props.children.replace(/\s+/g, '').toLowerCase()} {...props} />,
  code: CodeBlock,
  inlineCode: props => <code className='rounded px-1.5 py-1 bg-qrigray-100' {...props} />,
  li: props => <li className='mb-3' {...props} />,
  p: props => <p className='mb-6 leading-7' {...props} />,
  pre: props => <pre className='pre' {...props} />,
  strong: props => <strong className='font-semibold' {...props} />,
  ul: props => <ul className='mb-6' {...props} />,
  // a: AnchorTag
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  table: props => <table className='text-xs table-auto mb-6' {...props} />,
  thead: props => <thead className='text-left' {...props} />,
  th: props => <th className='border border-qrigray-100 p-2 font-medium' {...props} />,
  tbody: props => <tbody className='' {...props} />,
  tr: props => <tr className='border border-qrigray-100' {...props} />,
  td: props => <td className='border border-qrigray-100 p-2 align-top' {...props} />
}
//
// export default {
//   h1: props => <h1 className='text-black font-bold mt-8 mb-4 text-xl' {...props} />,
//   h2: props => <h2 className='text-black font-semibold mt-8 mb-4 text-lg' {...props} />,
//   h3: props => <h3 className='text-black font-medium mt-6 mb-3 text-base' {...props} />,
//   h4: props => <h4 className='font-medium mt-6 mb-3 text-sm' {...props} />,
// }
