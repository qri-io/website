import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'

import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

export const Content = styled('main')`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media only screen and (max-width: 767px) {
    height: auto;
  }
`

const DataStoryLayout = ({ children, location, pageContext }) => {
  const { frontmatter } = pageContext
  const { title, subtitle, by, date, heroImage } = frontmatter
  return (
    <div className='data-story-layout-wrapper flex-column'>
      <Head data={{
        title,
        description: subtitle,
        image: `${location.origin}/img/twitter_card_image.png`,
        imageAlt: 'The Qri Logo',
        url: location.href
      }}/>
      <Header location={location} showSidebar={false} />
      <div className='data-story-header text-left' style={{
        backgroundImage: `url(${heroImage})`
      }}>
        <div className='container'>
          <div className='title'>{title}</div>
          <div className='subtitle'>{subtitle}</div>
          <div className='byline'><span>by {by}</span> &nbsp; &nbsp;<span className='date'>{moment(date).format('MMMM Do YYYY')}</span></div>
        </div>
      </div>
      <div className='data-story'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default DataStoryLayout
