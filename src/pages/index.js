import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import ExternalLink from '../components/ExternalLink'
import FeaturedDatasets from '../components/FeaturedDatasets'
import BlogCard from '../components/BlogCard'

// the first argument in track() becomes the google analytics 'Action' property after passing through segment
// all events are of Action 'Homepage'
const fireEvent = (category, label) => {
  console.log('!', category, label)
  window.analytics.track('Homepage', {
    category,
    label
  })
}

const featuredVideoId = 'GXNfxbKYLHM'

const videos = [
  {
    id: 'dhdorFezaEc',
    title: 'Qri Desktop Demo: Exploring the Collection View'
  },
  {
    id: 'WKayeh0OAes',
    title: 'Qri Desktop Demo - Pull and Sync With Qri.Cloud'
  },
  {
    id: 'L5ud3kwI4OY',
    title: 'Webinar: Smarter Dataset Management with Qri'
  },
  {
    id: 'P2qeY2nPK3Q',
    title: 'Demo: Using the work-in-progress Qri Python client in Jupyter Notebooks'
  }
]

const videoList = videos.map(({ id, title }) => {
  return (
    <ExternalLink key={id} to={`https://www.youtube.com/watch?v=${id}`}>
      <div className='p-2 row video-thumbnail'>
        <div className='col-3 col-md-4 p-0'>
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} />
        </div>
        <div className='col-9 col-md-8 pl-2 my-auto'>
          <span className=''>{title}</span>
        </div>
      </div>
    </ExternalLink>
  )
})

const IndexPage = () => {
  return (
    <div className='index-page'>
      <div className='index-blue'>
        <div className='index-row hero'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-8 col-lg-6'>
                <table className='hero-table'>
                  <tbody>
                    <tr>
                      <td className='highlighted-border-bottom'><span>DATA</span></td>
                      <td><span>WITH</span></td>
                    </tr>
                    <tr>
                      <td className='highlighted'>
                        <span>FRIENDS</span>
                        <div className='plus-horizontal'/>
                        <div className='plus-vertical'/>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ width: '75%', marginBottom: '1.5rem', backgroundColor: '#FFFFFFDD', border: '0.2rem solid transparent', borderRadius: '0.2rem' }}>Qri helps you clean, version, organize, and share datasets.  Free & Open Source</p>
                <Link to='/download'>
                  <div
                    className='btn btn-lg btn-primary mr-4'
                    style={{ backgroundColor: '#5ED1E6' }}
                    onClick={ () => { fireEvent('button-click', 'download-top') }}
                  >
                    download
                  </div>
                </Link>
                <Link to='/docs'>
                  <div
                    className='btn btn-lg btn-secondary'
                    onClick={ () => { fireEvent('button-click', 'learn-more-top') }}
                  >
                    learn more
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='white-triangle'></div>
      </div>
      <div className='index-blue'>
        <div style={{ padding: '75px 0px 38px 0' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-sm-9 offset-sm-0 col-md-6'>
                <h1 className='col-12 col-md-9 text-center text-md-right m-0 mb-2'>Let’s rethink what datasets can do</h1>
                <p className='col-12 col-md-8 text-center text-md-left offset-md-4'>Qri is an all new suite of tools for doing more with datasets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='index-blue'>
        <div className='index-row' style={{ paddingBottom: '80px' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_01_version.svg")'
                }}>
                </div>
                <h3>Version</h3>
                <p>Compare one version to any other. Understand how datasets evolve with commit histories and diffing tools.</p>
              </div>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_02_share.svg")'
                }}>
                </div>
                <h3>Share</h3>
                <p>Qri is your personal data portal. Publishing makes your work easy for others to discover and use.</p>
              </div>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_03_automate.svg")'
                }}>
                </div>
                <h3>Automate</h3>
                <p>Bind code to data with transform scripts, and let your datasets update themselves.</p>
              </div>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_04_query.svg")'
                }}>
                </div>
                <h3>Query</h3>
                <p>Your entire collection of datasets works like a SQL database.</p>
              </div>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_05_integrate.svg")'
                }}>
                </div>
                <h3>Integrate</h3>
                <p>Export any version to a format you can use, or wire Qri up to your workflow with command line tools & language integrations.</p>
              </div>
              <div className='col-12 col-sm-6 col-md-4 feature-col'>
                <div className='index-feature-image' style={{
                  backgroundImage: 'url("/img/homepage/feature_06_collaborate.svg")'
                }}>
                </div>
                <h3>Collaborate</h3>
                <p>Open a discussion about your data, collect feedback, and discover new applications for it with the qri community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='index-row'>
        <div className='container mb-5'>
          <div className='row mb-4'>
            <div className='col-12 col-md-4 px-md-1'>
              <h2 className='my-2'>Featured Datasets</h2>
            </div>
            <div className='col-12 col-md-8 px-md-1'>
              <form
                method="GET"
                action="https://qri.cloud/search"
                className="input-container"
                onSubmit={ () => fireEvent('search-form-submit', '')}
              >
                <input type="text" className="text-input index-shadow" name="q" placeholder="Search for datasets" />
                <FontAwesomeIcon icon={faSearch} />
                <input type="submit" style={{ display: 'none' }} />
              </form>
            </div>
          </div>
          <FeaturedDatasets />
        </div>
        <div className='container'>
          <div className='col-9 offset-2 col-sm-12 offset-sm-0'>
            <div
              className='text-center more-link'
              onClick={ () => { fireEvent('more-link-click', 'cloud') }}
            >
              <ExternalLink to='https://qri.cloud'>explore more datasets on qri.cloud &nbsp;<FontAwesomeIcon icon={faChevronRight} /></ExternalLink>
            </div>
          </div>
        </div>
      </div>

      <div className='index-row'>
        <div className='container mb-5'>
          <div className='row mb-4'>
            <div className='col-12 col-md-4 px-md-1'>
              <h2 className='my-2'>Videos</h2>
            </div>
          </div>
          <div className='list row d-flex align-items-stretch'>
            <div className='video-card card-col col-12 col-md-7 col-lg-8 p-2 my-auto'>
              <div className='list-item card'>
                <div className='card-body video-iframe-container'>
                  <iframe className='responsive-iframe' src={`https://www.youtube.com/embed/${featuredVideoId}`} frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
                </div>
              </div>
            </div>
            <div className='card-col col-12 col-md-5 col-lg-4'>
              {videoList}
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='col-9 offset-2 col-sm-12 offset-sm-0'>
            <div
              className='text-center more-link'
              onClick={ () => { fireEvent('more-link-click', 'cloud') }}
            >
              <ExternalLink to='https://www.youtube.com/channel/UC7E3_hURgFO2mVCLDwPSyOQ'>see more videos on our YouTube channel &nbsp;<FontAwesomeIcon icon={faChevronRight} /></ExternalLink>
            </div>
          </div>
        </div>
      </div>

      <div className='index-row spotlight' style={{ position: 'relative', paddingBottom: '160px' }}>
        <div className='blob-diff-container' />
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <img src="/img/homepage/desktop_screenshot.png" className="img-fluid" />
            </div>
            <div className='col-12 col-md-6'>
              <h2 className='mt-0 mb-4'>Build & Manage Datasets<br/> With Qri Desktop</h2>
              <div className='mb-4'>
              Discover and clone others’ data;<br/>
              Author commits & track versions of your own.
              </div>
              <Link to='/download'>
                <div
                  className='btn btn-lg btn-primary mr-4'
                  onClick={ () => { fireEvent('button-click', 'download-bottom') }}
                >
                  download
                </div>
              </Link>
              <Link to='/docs'>
                <div
                  className='btn btn-lg btn-secondary'
                  onClick={ () => { fireEvent('button-click', 'learn-more-bottom') }}
                >
                  learn more
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='index-row spotlight' style={{ paddingBottom: '140px' }}>
        <div className='container' style={{ position: 'relative' }}>
          <div className='row'>
            <div className='col-12 col-md-6 offset-md-2' style={{ zIndex: 5 }}>
              <h2 className='mt-0 mb-4'>Integrate Anywhere with Qri CLI</h2>
              <div className='mb-3'>
              Full programmatic access to qri tools to customize & integrate with your workflow.<br/>
              Get started now with:
              </div>
              <div className='inline-code-highlight'>
              curl -fsSL https://qri.io/install.sh | sh
              </div>
            </div>
            <div className='col-12 col-md-4 p-0' style={{ zIndex: 5 }}>
              <img src="/img/homepage/cli_screenshot.png" className="img-fluid" />
            </div>
          </div>
          <div className='blob-trees-container' />
        </div>
      </div>

      <div className='index-row spotlight' style={{ paddingBottom: 0 }}>
        <div className='container mb-5'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='mt-0 mb-1'>Data Tells a Story</h1>
              <div className='mb-4'>
              Select data-driven publications from the Qri Blog
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <BlogCard
                title="Smarter Data Publishing with Qri"
                link='https://medium.com/qri-io/smarter-data-publishing-with-qri-4addb6917df8'
                image='https://miro.medium.com/max/1400/0*PJP0nq16C6bOQRXM.png'
                by='Chris Whong'
                date='2020-10-14'
                onClick={ () => { fireEvent('blog-card-click', 'smarter-data-publishing') }}
              />
            </div>
            <div className='col-12 col-md-4'>
              <BlogCard
                title="We Built This City on Bots & Trolls"
                link='https://medium.com/qri-io/we-built-this-city-on-bots-trolls-905065758fd4'
                image='https://miro.medium.com/max/1400/1*R1MPJA3ugQJxSyWWEl2Olw.png'
                by='Xristos Katsaros'
                date='2020-10-19'
                onClick={ () => { fireEvent('blog-card-click', 'bots-and-trolls') }}
              />
            </div>
            <div className='col-12 col-md-4'>
              <BlogCard
                title="Archiving your Google Sheets Data with Qri"
                link='https://medium.com/qri-io/archiving-your-google-sheets-data-with-qri-f84efda4bf3f'
                image='https://miro.medium.com/max/1400/1*5QPlYzKWhwnQ8PYxvUeeJg.png'
                by='Chris Whong'
                date='2020-10-29'
                onClick={ () => { fireEvent('blog-card-click', 'archive-google-sheets') }}
              />
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='col-9 offset-2 col-sm-12 offset-sm-0'>
            <div
              className='text-center more-link'
              onClick={ () => { fireEvent('more-link-click', 'blog') }}
            >
              <ExternalLink to='https://medium.com/qri-io'>read more stories on the qri blog &nbsp;<FontAwesomeIcon icon={faChevronRight} /></ExternalLink>
            </div>
          </div>
        </div>
      </div>

      <div className='index-row spotlight'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-8'>
              <h2>Sign up for the Qri Newsletter</h2>
              <form
                className='form-inline newsletter-form input-container'
                action='https://qri.us19.list-manage.com/subscribe/post?u=54a6a8c1171101850b8576277&amp;id=b41eb6f58e'
                method='post'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                target='_blank'
                noValidate
                onSubmit={ () => fireEvent('newsletter-form-submit', '')}
              >
                <div className='form-group mr-sm-3 mb-2'>
                  <input type='email' name='EMAIL' className='text-input index-shadow' placeholder='Your Email' id='mce-EMAIL' />
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <button type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' className='btn btn-primary btn-lg mb-2' style={{ height: '57px' }}>Subscribe</button>

                <div style={{
                  position: 'absolute',
                  left: '-5000px'
                }} aria-hidden='true'>
                  <input type='text' name='b_54a6a8c1171101850b8576277_b41eb6f58e' tabIndex='-1' />
                </div>
                <div id='mce-responses' className='clear'>
                  <div className='response' id='mce-error-response' style={{ display: 'none' }}></div>
                  <div className='response' id='mce-success-response' style={{ display: 'none' }}></div>
                </div>
              </form>
              <div>Receive updates on our progress and product releases</div>
            </div>
            <div className='col-12 col-md-4 my-4 my-md-0 text-center'>
              <h2 style={{
                fontFamily: 'Rubik',
                fontWeight: 700
              }}>QRI ♥️ FOSS</h2>
              <div className='mb-4'>This Data Party is Open Source</div>
              <ExternalLink to='https://github.com/qri-io'>
                <FontAwesomeIcon icon={faGithub} />
                <span onClick={ () => { fireEvent('social-link-click', 'github') }}>
                  github.com/qri-io
                </span>
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
