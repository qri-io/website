import React from 'react'
import CodeBlock from './codeBlock'
import AnchorTag from './anchor'

function createCustomHeading (tag) {
  let className = ''
  switch (tag) {
    case 'h1':
      className = 'text-black font-bold mt-8 mb-4 text-xl'
      break
    case 'h2':
      className = 'text-black text-lg font-semibold tracking-wide mt-8 mb-4 text-lg'
      break
    case 'h3':
      className = 'text-qrigray-900 font-semibold mt-6 mb-3'
      break
    case 'h4':
      className = 'text-qrigray-900 font-medium mt-6 mb-3 text-sm'
      break
    case 'h5':
      className = 'text-qrigray-600 font-semibold mb-1 text-sm'
      break
    case 'h6':
      className = 'text-qrigray-600 font-semibold mb-1 text-sm'
      break
  }
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ children, ...props }) =>
    React.createElement(
      tag,
      {
        className,
        ...props
      },
      // eslint-disable-next-line react/prop-types
      <a className={className} href={'#' + props.id}>
        {children}
      </a>
    )
}

export default {
  h1: createCustomHeading('h1'),
  h2: createCustomHeading('h2'),
  h3: createCustomHeading('h3'),
  h4: createCustomHeading('h4'),
  h5: createCustomHeading('h5'),
  h6: createCustomHeading('h6'),
  code: CodeBlock,
  inlineCode: props => <code className='rounded px-1.5 py-0.5 bg-qrigray-100 text-sm' {...props} />,
  li: props => <li className='mb-3' {...props} />,
  p: props => <p className='mb-6 leading-6 last:mb-0' {...props} />,
  pre: props => <pre className='pre' {...props} />,
  strong: props => <strong className='font-semibold' {...props} />,
  ul: props => <ul className='list-disc mb-6 ml-6' {...props} />,
  ol: props => <ul className='list-decimal mb-6 ml-6' {...props} />,
  blockquote: props => <blockquote className='ml-0 border-l-2 border-qritile px-5 py-4 text-sm' {...props} />,
  a: AnchorTag,
  // TODO add `img`
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
