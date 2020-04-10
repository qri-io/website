import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import ExternalLink from '../components/ExternalLink'
import FeaturedDataset from '../components/FeaturedDataset'
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
                <p style={{ width: '75%', marginBottom: '1.5rem' }}>Qri helps you clean, version, organize, and share datasets.  Free & Open Source</p>
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
                <h1 className='col-12 col-md-9 text-center text-md-right m-0 mb-2'>Let&apos;s rethink what datasets can do</h1>
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
          <div className='row'>
            <div className='col-12 col-md-4 px-md-1 d-flex align-items-stretch'>
              <FeaturedDataset
                dataset={{
                  peername: 'b5',
                  name: 'world_bank_population',
                  meta: {
                    title: 'World Bank Global Population by Year',
                    description: '( 1 ) United Nations Population Division. World Population Prospects: 2017 Revision. ( 2 ) Census reports and other statistical publications from national statistical offices, ( 3 ) Eurostat: Demographic Statistics, ( 4 ) United Nations Statistical Division. Population and Vital Statistics Reprot ( various years ), ( 5 ) U.S. Census Bureau: International Database, and ( 6 ) Secretariat of the Pacific Community: Statistics and Demography Programme.',
                    keywords: ['demographics']
                  },
                  structure: {
                    entries: 214,
                    format: 'csv',
                    length: 109700
                  },
                  commit: {
                    timestamp: '2020-03-24T20:59:19.315549Z'
                  }
                }}
                onClick={ () => { fireEvent('featured-dataset-click', 'b5/world_bank_population') }}
              />
            </div>
            <div className='col-12 col-md-4 px-md-1 d-flex align-items-stretch'>
              <FeaturedDataset
                dataset={{
                  peername: 'nyc-transit-data',
                  name: 'turnstile_daily_counts_2020',
                  meta: {
                    title: 'NYC Subway Turnstile Counts - 2020',
                    description: 'NYC Subway Turnstile Counts Data aggregated by day and station complex for the year 2020. Updated weekly.',
                    keywords: ['NYC', 'transit', 'subway', 'turnstiles', 'mobility']
                  },
                  structure: {
                    entries: 38111,
                    format: 'csv',
                    length: 41000000
                  },
                  commit: {
                    timestamp: '2020-04-04T11:22:51.657606Z'
                  }
                }}
                onClick={ () => { fireEvent('featured-dataset-click', 'nyc-transit-data/turnstile_daily_counts_2020') }}
              />
            </div>
            <div className='col-12 col-md-4 px-md-1 d-flex align-items-stretch'>
              <FeaturedDataset
                dataset={{
                  peername: 'chriswhong',
                  name: 'nyc_bridge_bike_counts_2019',
                  meta: {
                    title: 'NYC Bridge Bike Counts 2019',
                    description: "A filtered set of observations from NYC's [Bicycle Counts dataset](https://data.cityofnewyork.us/Transportation/Bicycle-Counts/uczf-rk3c). More specifically, it includes observations during the year 2019 for the three Manhattan to Brooklyn East River Bridges",
                    keywords: []
                  },
                  structure: {
                    entries: 35343,
                    format: 'csv',
                    length: 1234631
                  },
                  commit: {
                    timestamp: '2020-02-26T18:46:17.159963Z'
                  }
                }}
                onClick={ () => { fireEvent('featured-dataset-click', 'chriswhong/nyc_bridge_bike_counts_2019') }}
              />
            </div>
          </div>
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
              Discover and clone others&apos; data;<br/>
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
                title="Tracking a Bus Route's Data Footprint"
                link='https://qri.io/data-stories/brooklyn-bus-times'
                image='/data-stories-resources/brooklyn-bus-times/img/bus-in-traffic.jpg'
                by='Chris Whong'
                date='2020-02-05'
                onClick={ () => { fireEvent('blog-card-click', 'brooklyn-bus-times') }}
              />
            </div>
            <div className='col-12 col-md-4'>
              <BlogCard
                title="Taming the MTA's Unruly Turnstile Data"
                link='https://medium.com/qri-io/taming-the-mtas-unruly-turnstile-data-c945f5f96ba0?source=post_stats_page---------------------------'
                image='https://miro.medium.com/max/1400/1*xrm0PedCpul1HpNqNMwcZw.png'
                by='Chris Whong'
                date='2020-03-31'
                onClick={ () => { fireEvent('blog-card-click', 'mta-turnstile-data') }}
              />
            </div>
            <div className='col-12 col-md-4'>
              <BlogCard
                title="Which NYC Bridge Has The Most Bike Traffic?"
                link='https://medium.com/qri-io/which-nyc-bridge-has-the-most-bike-traffic-6bb291eb74ef'
                image='https://miro.medium.com/max/4800/1*VP-Y10SbaBxok_ONXifo2g@2x.png'
                by='Chris Whong'
                date='2020-02-24'
                onClick={ () => { fireEvent('blog-card-click', 'nyc-bridge-bike-counts') }}
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
