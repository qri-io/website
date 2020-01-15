import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

const IndexPage = () => (
  <div className='index-page'>
    <div className='index-row' style={{
      backgroundImage: 'url("img/blobs-sharing-datasets.png")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right'
    }}>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-5 col-lg-5'>
            <table className='hero-table'>
              <tbody>
                <tr>
                  <td className='highlighted-border-bottom'><span>DATA</span></td>
                  <td><span>WITH</span></td>
                </tr>
                <tr>
                  <td className='highlighted'><span>FRIENDS</span></td>
                </tr>
              </tbody>
            </table>
            <p>Qri helps you clean, version, organize, and share datasets.</p>
            <div className='btn btn-lg btn-primary'>download</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className='btn btn-lg btn-secondary'>learn more</div>
          </div>
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-sm-4 col-md-6 index-image-col' style={{
          backgroundImage: 'url("img/blob-diff.png")'
        }}>
        </div>
        <div className='col-12 col-sm-8 col-md-6 index-feature-blurb my-4 my-md-0'>
          <FontAwesomeIcon icon={faFile} className='d-none d-sm-block' />
          <h2>See What Changed</h2>
          <p>Dataset diffing has arrived! You can quickly see what changed between versions</p>
          <Link to='/docs'>Learn more about data diffing</Link>
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='row d-flex flex-sm-row-reverse'>
        <div className='col-12 col-sm-4 col-md-6 index-image-col' style={{
          backgroundImage: 'url("img/blob-trees.png")'
        }}>
        </div>
        <div className='col-12 col-sm-8 col-md-6 index-feature-blurb my-4 my-md-0'>
          <FontAwesomeIcon icon={faFile} className='d-none d-sm-block' />
          <h2>Document your datasets</h2>
          <p>Qri provides structured metadata, commit messages, and free-form READMEs that live alongside your data</p>
          <Link to='/docs'>Learn more about data documentation</Link>
        </div>
      </div>
    </div>

    <div className='container'>
      <div className='row'>
        <div className='col-12 col-sm-4 col-md-6 index-image-col' style={{
          backgroundImage: 'url("img/blob-diff.png")'
        }}>
        </div>
        <div className='col-12 col-sm-8 col-md-6 index-feature-blurb my-4 my-md-0'>
          <FontAwesomeIcon icon={faFile} className='d-none d-sm-block' />
          <h2>Painless CSV Editing</h2>
          <p>Simple CSV editing means avoiding the clumsy automatic formatting of spreadsheets.  Datasets in, datasets out.</p>
          <Link to='/docs'>Learn more about CSV editing</Link>
        </div>
      </div>
    </div>

    <div className='container info-row'>
      <div className='row'>
        <div className='col-12 my-4 my-md-0 text-center'>
          <h2>🛠 We&apos;re Building a Data Commons</h2>
          <p>At Qri, we are hard at work building a new set of tools for the future of dataset management, collaboration, and trust.  We think data is better when we work together.</p>
          <Link to='/docs'><div className='btn btn-primary btn-lg'>See our Roadmap</div></Link>
        </div>
      </div>
    </div>

    <div className='container info-row'>
      <div className='row'>
        <div className='col-12 col-md-8'>
          <h2>Sign up for Product Updates</h2>
          <form className='form-inline newsletter-form' action='https://qri.us19.list-manage.com/subscribe/post?u=54a6a8c1171101850b8576277&amp;id=b41eb6f58e' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' target='_blank' noValidate>
            <div className='form-group mr-sm-3 mb-2'>
              <input type='email' name='EMAIL' className='form-control' placeholder='email@address.com' id='mce-EMAIL' />
            </div>
            <button type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' className='btn btn-primary mb-2' >Subscribe</button>

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
          <p style={{ fontSize: '0.8rem' }}>You&apos;ll receive at-most-once-a-month updates on our progress.</p>
        </div>
        <div className='col-12 col-md-4 index-feature-blurb my-4 my-md-0 text-center'>
          <h2>QRI ♥️ FOSS</h2>
          <p>This Data Party is Open Source</p>
          <Link to='https://github.com/qri_io'>github.com/qri_io</Link>
        </div>
      </div>
    </div>

    <div className='container info-row'>
      <div className='row'>
        <div className='col-12 my-4 my-md-0 text-center'>
          <h2>🤓 A versioned dataset is a happy dataset 🤓</h2>
          <p>Download Qri Desktop for MacOS or Windows</p>
          <Link to='/download'><div className='btn btn-primary btn-lg'>Download Qri</div></Link>
        </div>
      </div>
    </div>

  </div>
)

export default IndexPage
