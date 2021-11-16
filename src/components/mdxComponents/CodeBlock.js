import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import Highlight, { defaultProps } from 'prism-react-renderer'
import prismTheme from 'prism-react-renderer/themes/github'
import Loadable from 'react-loadable'
import ReactTooltip from 'react-tooltip'

import LoadingProvider from './loading'
import Icon from '../Icon'

// override background and default text color
prismTheme.plain = {
  color: '#545F66',
  fontSize: 14
}

/** Removes the last token from a code example if it's empty. */
function cleanTokens (tokens) {
  const tokensLength = tokens.length
  if (tokensLength === 0) {
    return tokens
  }
  const lastToken = tokens[tokensLength - 1]
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1)
  }
  return tokens
}

const LoadableComponent = Loadable({
  loader: () => import('./LiveProvider'),
  loading: LoadingProvider
})

/* eslint-disable react/jsx-key */
const CodeBlock = ({
  children: exampleCode,
  className,
  containerClassName,
  id = '',
  copyable = false,
  ...props
}) => {
  const match = className.match(/language-(\w*)/)
  const language = match ? match[1] : 'text'

  const tooltipEl = useRef(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopySuccess(true)
    ReactTooltip.show(tooltipEl.current)
    setTimeout(() => {
      setCopySuccess(false)
      ReactTooltip.hide(tooltipEl.current)
    }, 2000)
  }

  let title = ''
  if (className?.includes('title=')) {
    title = className.split('title=')[1]
  }

  if (props['react-live']) {
    return (
      <LoadableComponent code={exampleCode} />
    )
  } else {
    return (
      <div className={classNames(containerClassName, 'bg-qrigray-100 group relative')}>
        {title && (
          <div className='border-b px-4 py-2 text-sm'>
            {title}
          </div>
        )}
        <div className={className}>
          <Highlight
            {...defaultProps}
            code={exampleCode}
            language={language}
            theme={prismTheme}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={classNames(className, 'pre no-scrollbar')} style={style} p={3}>
                {cleanTokens(tokens).map((line, i) => {
                  let lineClass = {}
                  let isDiff = false
                  if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                    lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                    isDiff = true
                  } else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                    lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' }
                    isDiff = true
                  } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '+') {
                    lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                    isDiff = true
                  } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '-') {
                    lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' }
                    isDiff = true
                  }
                  const lineProps = getLineProps({ line, key: i })
                  lineProps.style = lineClass
                  const diffStyle = { userSelect: 'none', MozUserSelect: '-moz-none', WebkitUserSelect: 'none' }
                  let splitToken
                  return (
                    <div {...lineProps} key={line + i}>
                      {line.map((token, key) => {
                        if (isDiff) {
                          if ((key === 0 || key === 1) & (token.content.charAt(0) === '+' || token.content.charAt(0) === '-')) {
                            if (token.content.length > 1) {
                              splitToken = { types: ['template-string', 'string'], content: token.content.slice(1) }
                              const firstChar = { types: ['operator'], content: token.content.charAt(0) }
                              return (
                                <React.Fragment key={token + key}>
                                  <span {...getTokenProps({ token: firstChar, key })} style={diffStyle} />
                                  <span {...getTokenProps({ token: splitToken, key })} />
                                </React.Fragment>
                              )
                            } else {
                              return (
                                <span {...getTokenProps({ token, key })} style={diffStyle} />
                              )
                            }
                          }
                        }
                        return (<span {...getTokenProps({ token, key })} />)
                      })}
                    </div>
                  )
                })}
              </pre>
            )}
          </Highlight>
        </div>
        {
          copyable && (
            <>
              <div
                className={classNames('group-hover:visible absolute bottom-4 right-4 rounded bg-white p-1.5 text-center text-black hover:cursor-pointer', {
                  invisible: !copySuccess
                })}
                style={{ height: 34, width: 34 }}
                onClick={() => { copyToClipboard(exampleCode) }}
                data-tip='Copied!'
                data-for={id}
                data-event='noevent'
                ref={tooltipEl}
              >
                {!copySuccess && <Icon icon='copy' size='sm' />}
                {copySuccess && <Icon icon='check' size='sm' className='text-green-600' />}
              </div>
              <ReactTooltip
                id={id}
                effect='solid'
                place='bottom'
                padding='2px'
                className='codeblock-tooltip'
              />
            </>
          )
        }
      </div>
    )
  }
}

export default CodeBlock
