---
title: "qri"
description: ("query")
date: 2017-10-30T00:00:00-04:00
bodyClass: index
---

<div id="main" class="index">
  <header id="hero">
    <div class="wrap">
      <div id="blob_trio"></div>
      <div class="text_block">
        <h1>You're Invited to a Data Party</h1>
        <p>qri (“query”) is a free data bonanza<br />for everyone</p>
        <a href="/download" id="download_button" class="button">Party</a>
      </div>
    </div>
  </header>

  <section id="feature_descriptions">
    <div class="wrap">
      <div id="web_of_datasets" class="feature_description">
        <h2>Qri is a Web of Datasets</h2>
        <p>Qri is built around datasets. Bigger than a spreadsheet, smaller than a database, datasets are all around us. qri is a big dataset bonanza, where people of all stripes can mix together all their sweet sweet data.</p>
      </div>
      <div id="open_source" class="feature_description">
        <h2>This Party is Free and Open Source</h2>
        <p>Data is better when we work together. Qri costs nothing to use, and is built as an open source project under a GPL license.</p>
      </div>
      <div id="datasets_you_can_use" class="feature_description">
        <h2>Datasets You Can Actually Use</h2>
        <p>Every dataset change is tracked & attributed to an author, so you can audit whether the data you’re looking at meets your standards, and track changes as they happen.</p>
      </div>
      <div id="any_skill_level" class="feature_description">
        <h2>Tools for Any Skill Level</h2>
        <p>Whether you're a data scientist, or have only ever touched excel, we have tools for you.</p>
      </div>
    </div>
  </section>
  
  <section id="distributed_web">
    <div class="wrap">
      <div class="text_block">
        <h3>Built on the Distributed Web</h3>
        <p>Qri is built from the ground up as a distribted network on top of IPFS. We chose IPFS because it’s both global and content-addressed — perfect for datasets.</p>
        <p>Data you’ve downloaded stays local. Content-addressing lets data be stored anywhere without sacrificing security. All this adds up to a web of datasets that is faster, more secure, and free.</p>
      </div>
    </div>
  </section>

  <section id="app_and_cli">
    <div class="wrap">
      <h2>Works With Both <br />Mouse and Keyboard</h2>
      <div id="app_screenshot"></div>
      <div id="terminal_window">
        <div id="window_chrome">
          <div class="red circle"></div>
          <div class="yellow circle"></div>
          <div class="green circle"></div>
        </div>
        <pre><span class="white">$ qri add --file=dataset.yaml me/data</span><span class="green">dataset created!</span><br /><span class="white">$ qri connect</span><span class="gray">connecting to IPFS and qri P2P… <br />peername: b5 <br />JSON API port: 2503 <br />Webapp port: 2505</span>
        </pre>
      </div>
      <div class="text_block">
        <p>Qri has a desktop app and command line tools. Both are free and open source.<br /><a href="download">Download</a></p>
      </div>
    </div>
  </section>

  <section id="tech_features">
    <div class="wrap">
      <div class="features_list">
        <div id="existing_specs" class="feature_description">
          <h3>Qri Uses Existing Specs</h3>
          <p>Wherever possible, we aim to use specifications & technologies that already exist. The end result is a natural set of integration points that makes qri less about being a “data platform” and more a series of integrations between platforms.</p>
        </div>
        <div id="git_style" class="feature_description">
          <h3>Git-style version control</h3>
          <p>Qri’s dataset versioning system is inspired by git, and signs each commit with your identifying keypair. Because qri is only about datasets, qri generates commit messages for you.</p>
        </div>
        <div id="data_formats" class="feature_description">
          <h3>Native support for JSON, CSV, CBOR data formats</h3>
          <p>Mix & match any format as you need, import from and export to any format.</p>
        </div>
        <div id="meta_specs" class="feature_description">
          <h3>Metadata based on library science</h3>
          <p>Librarians are better at metadata than developers, so we based our metadata spec on DCAT & Project Open Data, for cleaner integration with existing data catlogs.</p>
        </div>
        <div id="json_schemas" class="feature_description">
          <h3>JSON-Schemas for validation & OpenAPIs</h3>
          <p>Dataset schemas are defined with the same spec that drives OpenAPIs. Datasets automatically generate a JSON API & accompanying OpenAPI documentation.</p>
        </div>
        <div id="transformations" class="feature_description">
          <h3>Automate data munging with Python’s cousin: Skylark</h3>
          <p>Write configurable, repeatable transformations that can build on remote sources and other qri datasets, in a syntax that feels like Python.</p>
        </div>
      </div>
      <div class="action_buttons">
        <!-- <a class="button outline big" href="/docs" onclick="_gaq.push(['_trackEvent', 'qri', 'download']);">Docs</a> -->
        <a class="button outline big" href="https://github.com/qri-io" onclick="_gaq.push(['_trackEvent', 'qri', 'github']);">Gimmie Github</a>
      </div>
    </div>
  </section>


  <section id="work_together">
    <div class="wrap">
      <div class="text_block">
        <h1>Data is Better When We Work Together</h1>
      </div>
    </div>
  </section>
</div>

