import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

import Head from '../components/Head'
import ExternalLink from '../components/ExternalLink'

const latestVersion = '0.5.0'
const macDownloadUrl = `https://github.com/qri-io/desktop/releases/download/v${latestVersion}/Qri-Desktop-${latestVersion}.dmg`

const windowsDownloadUrl = `https://github.com/qri-io/desktop/releases/download/v${latestVersion}/Qri.Desktop.Setup.${latestVersion}.exe`

// the first argument in track() becomes the google analytics 'Action' property after passing through segment
const handleDownloadClick = (os) => {
  window.analytics.track('Download', {
    category: 'Qri Desktop',
    label: `Download - ${os}`
  })
}

const DownloadPage = () => (
  <>
    <Head data={{
      title: 'Download Qri',
      description: 'Download Qri Desktop for Mac or Windows'
    }} >
      <script src='/js/download.js' />
    </Head>
    <div id="splash" className="windows">
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="logo">
              <img className="img-fluid" src="/img/graphics/qri_data_snuggle_icon.png"/>
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-12">
              <h1 className="mb-4">Introducing Qri Desktop</h1>
              <p className="col-md-8 mx-auto mb-4">
              As an open-source project, Qri is both the resource and product of a community of contributors and data enthusiasts - many of whom share feature ideas, help find and squash bugs, or contribute code and datasets.
              </p>
              <ExternalLink to={macDownloadUrl} onClick={() => { handleDownloadClick('mac') }}>
                <button
                  className="mx-1 my-3 btn btn-qri btn-qri-magenta btn-qri-big"
                  data-os="mac"
                >
                  Download for macOS
                </button>
              </ExternalLink>
              <p data-os="mac">
                <small>
                  <ExternalLink to={windowsDownloadUrl} onClick={() => { handleDownloadClick('windows') }}>
                    Download for Windows
                  </ExternalLink>
                </small>
              </p>
              <ExternalLink to={windowsDownloadUrl} onClick={() => { handleDownloadClick('windows') }}>
                <button className="mx-1 my-3 btn btn-qri btn-qri-magenta btn-qri-big" data-os="windows">
                  Download for Windows
                </button>
              </ExternalLink>
              <p data-os="windows">
                <small>
                  <ExternalLink to={macDownloadUrl} onClick={() => { handleDownloadClick('mac') }}>
                    Download for Mac
                  </ExternalLink>
                </small>
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
            Once you’ve downloaded Qri Desktop, take a look at our <Link to="/docs/getting-started/qri-desktop-quickstart">Quickstart Documentation</Link>.
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <img className="screenshot img-fluid" src="/img/homepage/desktop_screenshot.png" style={{ borderRadius: '5px' }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="triptych">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5 text-center text-md-left">
              <h4>See Your Data Change</h4>
              <p>Craft new versions with visual feedback on how your dataset has changed</p>
            </div>
            <div className="col-md-4 mb-5 text-center text-md-left">
              <h4>Surf Thru Time</h4>
              <p>Don’t <i>guess</i> what changed, <i>Know</i> what changed, and who changed it.</p>
            </div>
            <div className="col-md-4 mb-5 text-center text-md-left">
              <h4>Data Formats You Know</h4>
              <p>Version common data formats like CSV, JSON, and XLSX. Qri understands each and can convert between formats for you.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="container">
          <div className="row  align-items-center">
            <div className="col-md-6 col-sm-12 p-4 text-center text-md-right">
              <img className="img-fluid" style={{
                borderRadius: '5px',
                boxShadow: '0 10px 20px #00000090'
              }} src="/img/screenshots/commit_section.png"/>
            </div>
            <div className="col-md-6 col-sm-12 p-4 text-center text-md-left">
              <h3>Goodbye, Filename Versioning</h3>
              <div className="d-flex filename justify-content-center">
                <div className="align-self-center"><FontAwesomeIcon icon={faFileExcel} size='2x'/></div>
                <div className="align-self-center"><pre> report_data_final_FINAL.xlsx</pre></div>
              </div>
              <p>Dataset versioning means knowing who made changes, what they changed, and when. With Qri, you can bring order to the chaos of many people editing a common dataset.</p>
            </div>
          </div>
          <div className="row d-md-flex flex-items-center flex-md-row-reverse align-items-center">
            <div className="flex-auto col-md-6 col-sm-12 p-4 text-center text-md-left">
              <img className="img-fluid" src="/img/graphics/getting_started/cloud.png"/>
            </div>
            <div className="flex-auto col-md-6 col-sm-12 p-4 text-center text-md-left">
              <h3>One Click Sharing</h3>
              <p>Qri Desktop lets you to easily share datasets on <a href="https://qri.cloud">qri.cloud</a>, our dataset discovery and collaboration service. Go from data file on your computer to public qri dataset in under a minute.</p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 p-4 text-center text-md-right">
              <img className="img-fluid" src="/img/diagrams/data_exchange_2.svg"/>
            </div>
            <div className="col-md-6 col-sm-12 p-4 text-center text-md-left">
              <h4>Distributed Data is Healthy Data</h4>
              <p>Qri is a data commons, where many people exchange many datasets.  More eyeballs on your dataset means spotting errors sooner, discovering new use cases, and a feedback loop between data publishers and consumers.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center my-5">
              <ExternalLink to='https://github.com/qri-io/desktop'>
                <button className="btn btn-qri-dark-blue text-white">
                  <FontAwesomeIcon icon={faGithub} />&nbsp; Follow Qri Desktop on Github
                </button>
              </ExternalLink>
            </div>
            <div className="row d-md-flex flex-items-center flex-md-row-reverse">
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default DownloadPage
