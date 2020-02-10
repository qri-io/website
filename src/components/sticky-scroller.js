import React, { Component } from 'react'

class StickyScroller extends Component {
  constructor (props) {
    super(props)
    this.myRef = React.createRef()

    this.scrollerItemRefs = props.scrollerItems.map(d => React.createRef())

    this.state = {
      fixContent: false,
      absoluteContentTranslateY: 0,
      fixedContentTranslateY: 0,
      width: 0,
      lastViewportYOffset: 0,
      stickyFrame: -1
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll () {
    // get the previous scroll position and the translate for non-sticky content
    const {
      lastViewportYOffset,
      absoluteContentTranslateY
    } = this.state

    // get the viewport offset and height
    const {
      pageYOffset: viewportYOffset,
      innerHeight: viewportHeight
    } = window

    // get this component's offset, height, and width
    const {
      offsetTop: containterOffsetTop,
      clientHeight: containerHeight,
      clientWidth: containerWidth
    } = this.myRef.current

    // the content is the first child of the container
    const {
      clientHeight: contentHeight
    } = this.myRef.current.childNodes[0]

    // pixels between top of this component and the top of the viewport
    const distanceFromTop = (viewportYOffset - containterOffsetTop) * -1

    // constant: distance from top of page to bottom of this component
    const distanceToBottom = containerHeight + containterOffsetTop

    // y position of bottom of content when fixed
    const offsetPlusContentHeight = viewportYOffset + contentHeight

    // difference between content height and viewport height, divide by 2 to verically center content
    const margin = (viewportHeight - contentHeight) / 2

    // boolean, fix if user has scrolled into this component, compensate for margin
    const shouldFixContent = (distanceFromTop <= margin) && (distanceToBottom >= offsetPlusContentHeight + margin)

    // determine if we are scrolling up or down
    const scrollDirection = (viewportYOffset > lastViewportYOffset) ? 'down' : 'up'

    // use previous when scrolling outside of this component
    let newTranslateY = absoluteContentTranslateY

    if (shouldFixContent) {
      if (scrollDirection === 'up') {
        newTranslateY = 0
      }

      if (scrollDirection === 'down') {
        newTranslateY = (containerHeight - contentHeight)
      }
    }

    // get index of scrollerItem that's currently in view
    const scrollerItemInView = this.scrollerItemRefs.reduce((acc, curr, i) => {
      const itemOffset = curr.current.getBoundingClientRect().top
      const inRange = itemOffset > 0 && itemOffset < contentHeight + margin
      return inRange ? i : acc
    }, -1)

    this.setState({
      fixContent: shouldFixContent,
      absoluteContentTranslateY: newTranslateY,
      fixedContentTranslateY: margin,
      lastViewportYOffset: viewportYOffset,
      width: containerWidth,
      stickyFrame: scrollerItemInView
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { id, scrollerItems, content: Content } = this.props
    const {
      absoluteContentTranslateY,
      fixedContentTranslateY,
      fixContent,
      width,
      stickyFrame
    } = this.state
    let fixedDivStyle = {
      transform: `translate(0px, ${absoluteContentTranslateY}px)`
    }

    if (fixContent) {
      fixedDivStyle = {
        position: 'fixed',
        transform: `translate(0px, ${fixedContentTranslateY}px)`,
        top: 0,
        width
      }
    }

    let scrollerElements = null

    if (scrollerItems) {
      scrollerElements = scrollerItems.map((d, i) => (
        <div key={i} ref={this.scrollerItemRefs[i]} className='scroller-text text-left'>
          {d}
        </div>
      ))
    }

    return (
      <div id={id} ref={this.myRef} className='sticky-scroller'>
        <div className='sticky-content' style={fixedDivStyle}>
          <Content stickyFrame={stickyFrame}/>
        </div>
        <div className='scroller-filler'>&nbsp;</div>
        {scrollerElements}
        <div className='scroller-filler'>&nbsp;</div>
      </div>
    )
  }
}

export default StickyScroller
