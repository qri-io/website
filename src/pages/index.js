import React from 'react'
import MailingList from '../components/MailingList'
import ExternalLink from '../components/ExternalLink'

import Highlight from 'react-highlight.js'
import { Link } from 'gatsby'

import Head from '../components/Head'

const IndexPage = () => (
  <div id="main" className="index">
    <Head data={{}}>
      <script src='/js/download.js' />
    </Head>
    <header id="hero">
      <div className="wrap">
        <div id="blob_trio"></div>
        <div className="text_block">
          <h1>A New Tool For Data Science</h1>
          <h4 className="subhead">qri (“query”) is versioned, scriptable, exportable, collaborative datasets</h4>
          <Link to='/download'><button id="download_button" className="button">Download</button></Link>
        </div>
      </div>
    </header>

    <section id="feature_descriptions">
      <div className="wrap">
        <div id="web_of_datasets" className="feature_description">
          <h2>A Web of Datasets</h2>
          <p>Qri is built around datasets. Bigger than a spreadsheet, smaller than a database, datasets are all around us. Use Qri to browse, download, create, fork, and publish datasets with a broad network of peers.</p>
          <Link to='/docs/dataset-components/overview'><button id="download_button" className="button">About Qri Datasets</button></Link>
        </div>
        <div id="open_source" className="feature_description">
          <h2>This Party is Free and Open Source</h2>
          <p>Data is better when we work together. Qri costs nothing to use, and is built as an open source project under a GPL license.</p>
        </div>
        <div id="datasets_you_can_use" className="feature_description">
          <h2>Datasets You Can Actually Use</h2>
          <p>Every dataset change is tracked & attributed to an author, so you can audit whether the data you’re looking at meets your standards, and track changes as they happen.</p>
        </div>
        <div id="any_skill_level" className="feature_description">
          <h2>Tools for Any Skill Level</h2>
          <p>Whether you&apos;re a data scientist, or have only ever touched excel, we have tools for you.</p>
        </div>
      </div>
    </section>

    <section id="distributed_web">
      <div className="wrap">
        <div className="text_block">
          <h3>Built on the Distributed Web</h3>
          <p>Qri is built from the ground up as a distributed network on top of IPFS. We chose IPFS because it’s both global and content-addressed — perfect for datasets.</p>
          <p>Data you’ve downloaded stays local. Content-addressing lets data be stored anywhere without sacrificing security. All this adds up to a web of datasets that is faster, more secure, and free.</p>
        </div>
      </div>
    </section>

    <section id="app_and_cli">
      <div className="wrap">
        <h2>Works With Both <br />Mouse and Keyboard</h2>
        <div id="app_screenshot"></div>
        <div id="terminal_window">
          <div id="window_chrome">
            <div className="red circle"></div>
            <div className="yellow circle"></div>
            <div className="green circle"></div>
          </div>
          <Highlight language='bash'>
            <span className="white">$ qri add --file=dataset.yaml me/data</span><span className="green">dataset created!</span><br /><span className="white">$ qri connect</span><span className="gray">connecting to IPFS and qri P2P… <br />peername: b5 <br />JSON API port: 2503 <br />Webapp port: 2505</span>
          </Highlight>
        </div>
        <div className="text_block">
          <p>Qri has a desktop app and command line tools. Both are free and open source.<br /><Link to="/download">Download</Link></p>
        </div>
      </div>
    </section>

    <section id="tech_features">
      <div className="wrap">
        <div className="features_list">
          <div id="existing_specs" className="feature_description">
            <h3>Qri Uses Existing Specs</h3>
            <p>Wherever possible, we aim to use specifications & technologies that already exist. The end result is a natural set of integration points that makes qri less about being a “data platform” and more a series of integrations between platforms.</p>
          </div>
          <div id="git_style" className="feature_description">
            <h3>Git-style version control</h3>
            <p>Qri’s dataset versioning system is inspired by git, and signs each commit with your identifying keypair. Because qri is only about datasets, qri generates commit messages for you.</p>
          </div>
          <div id="data_formats" className="feature_description">
            <h3>Native support for JSON, CSV, CBOR data formats</h3>
            <p>Mix & match any format as you need, import from and export to any format.</p>
          </div>
          <div id="meta_specs" className="feature_description">
            <h3>Metadata based on library science</h3>
            <p>Librarians are better at metadata than developers, so we based our metadata spec on DCAT & Project Open Data, for cleaner integration with existing data catalogs.</p>
          </div>
          <div id="json_schemas" className="feature_description">
            <h3>JSON-Schemas for validation & OpenAPIs</h3>
            <p>Dataset schemas are defined with the same spec that drives OpenAPIs. Datasets automatically generate a JSON API & accompanying OpenAPI documentation.</p>
          </div>
          <div id="transformations" className="feature_description">
            <h3>Automate data munging with Python’s cousin: Starlark</h3>
            <p>Write configurable, repeatable transformations that can build on remote sources and other qri datasets, in a syntax that feels like Python.</p>
          </div>
        </div>
        <div className="action_buttons">
          <ExternalLink to="https://github.com/qri-io"><button className="button outline big" onClick={() => { window._gaq.push(['_trackEvent', 'qri', 'github']) }}>Gimmie Github</button></ExternalLink>
        </div>
      </div>
    </section>

    <section id="work_together">
      <div className="wrap">
        <div className="text_block">
          <h1>Data is Better When We Work Together</h1>
        </div>
      </div>
    </section>

    <MailingList />
  </div>
)

export default IndexPage
