---
title: "download"
date: 2017-10-30T00:00:00-04:00
draft: false
---

<div id="main" class="index">
  <header id="hero">
    <div class="wrap">
      <div class="text_block">
        <h1>Download Qri</h1>
        <p>qri comes in two flavors, an app and a command-line client. If you're alredy comfortable with the command line, it's worth checking out the CLI, otherwise, check out the app!</p>
      </div>
    </div>
  </header>

  <section id="download_app" class="rotate">
    <div class="wrap unrotate">
      <div class="text_block">
        <h2>Qri Desktop</h2>
        <p>Desktop app for interacting with qri datasets on the distributed web.</p>
        <p>Currently only available for Mac OS X.</p>
        <p><i>If you'd like to track the status of other installations, check out our progress on <a href="https://github.com/qri-io/frontend">github</a></i></p>
        <br />
        <a href="https://github.com/qri-io/frontend/releases/download/v0.5.1/qri-0.5.1.dmg" download="qri.dmg" class="download button">
          <b class="title">Download Qri Desktop</b><br />
          <small>For Mac OS X</small>
        </a>
      </div>
      <div id="app_screenshot"></div>
    </div>
  </section>

  <section id="download_cli">
    <div class="wrap">
      <div class="text_block">
        <h2>Qri CLI</h2>
        <p>Command-Line Tools for interacting with qri</p>
        <p><i>While we've only prepared an installer for Mac OS X <br />Linux Users, can always build from <a href="https://github.com/qri-io/qri">source</a></i></p>
        <a href="https://github.com/qri-io/qri/releases/download/v0.5.5/qri_os_x_cli_darwin_amd64.pkg" download="qri_cli.pkg" class="download button">
          <b class="title">Download Qri CLI</b><br />
          <small>For Mac OS X</small>
        </a>
      </div>
      <div id="terminal_window">
        <div id="window_chrome">
          <div class="red circle"></div>
          <div class="yellow circle"></div>
          <div class="green circle"></div>
        </div>
        <pre><span class="white">$ qri add --file=dataset.yaml me/data</span><span class="green">dataset created!</span><br /><span class="white">$ qri connect</span><span class="gray">connecting to IPFS and qri P2P… <br />peername: b5 <br />JSON API port: 2503 <br />Webapp port: 2505</span>
        </pre>
      </div>
    </div>
  </section>
</div>