---
title: "desktop"
layout: desktop_splash
---
<div id="splash" class="windows">
  <nav class="navbar navbar-expand-sm">
    <div style="display:inline-block;">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/desktop">Overview</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/desktop/getting-started">Getting Started</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/docs">Help</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="hero">
    <div class="container text-center">
      <div class="row">
        <div class="logo">
          <img class="img-fluid" src="/graphics/qri_data_snuggle_icon.png"/>
        </div>
      </div>
      <div class="row pb-3">
        <div class="col-12">
          <h1 class="mb-4">Introducing Qri Desktop</h1>
          <p class="col-md-8 mx-auto mb-4">
            As an open-source project, Qri is both the resource and product of a community of contributors and data enthusiasts - many of whom share feature ideas, help find and squash bugs, or contribute code and datasets.
          </p>
          <a class="mx-1 my-3 btn btn-qri btn-qri-magenta btn-qri-big" href="https://github.com/qri-io/desktop/releases/download/v0.1.0/Qri-Desktop-0.1.0-mac.zip" data-os="mac">Download for macOS</a>
          <p><small><a href="https://github.com/qri-io/desktop/releases/download/v0.1.0/Qri-Desktop-Setup.0.1.0-win.exe" data-os="mac">Download for Windows</a></small></p>
          <a class="mx-1 my-3 btn btn-qri btn-qri-magenta btn-qri-big" href="https://github.com/qri-io/desktop/releases/download/v0.1.0/Qri-Desktop-Setup.0.1.0-win.exe" data-os="windows">Download for Windows</a>
          <p><small><a href="https://github.com/qri-io/desktop/releases/download/v0.1.0/Qri-Desktop-0.1.0-mac.zip" data-os="windows">Download for Mac</a></small></p>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          Once you've downloaded Qri Desktop, take a look at our <a href="/desktop/getting-started">getting started guide</a>.
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <img class="screenshot img-fluid" src="/screenshots/history_with_commits_mac.png" style='border-radius: 5px'/>
        </div>
      </div>
    </div>
  </div>
  <div class="triptych">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-5 text-center text-md-left">
          <h4>See Your Data Change</h4>
          <p>Craft new versions with visual feedback on how your dataset has changed</p>
        </div>
        <div class="col-md-4 mb-5 text-center text-md-left">
          <h4>Surf Thru Time</h4>
          <p>Don't <i>guess</i> what changed, <i>Know</i> what changed, and who changed it.</p>
        </div>
        <div class="col-md-4 mb-5 text-center text-md-left">
          <h4>Data Formats You Know</h4>
          <p>Version common data formats like CSV, JSON, and XLSX. Qri understands each and can convert between formats for you.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="features">
    <div class="container">
      <div class="row  align-items-center">
        <div class="col-md-6 col-sm-12 p-4 text-center text-md-right">
          <img class="img-fluid" style="border-radius:5px;border-radius:5px;box-shadow:0 10px 20px #00000090;" src="/screenshots/commit_section.png"/>
        </div>
        <div class="col-md-6 col-sm-12 p-4 text-center text-md-left">
          <h3>Goodbye, Filename Versioning</h3>
          <div class="d-flex filename justify-content-center">
            <div class="align-self-center"><i class="far fa-file-excel fa-2x"></i></div>
            <div class="align-self-center"><pre> report_data_final_FINAL.xlsx</pre></div>
          </div>
          <p>Dataset versioning means knowing who made changes, what they changed, and when. With Qri, you can bring order to the chaos of many people editing a common dataset.</p>
        </div>
      </div>
      <div class="row d-md-flex flex-items-center flex-md-row-reverse align-items-center">
        <div class="flex-auto col-md-6 col-sm-12 p-4 text-center text-md-left">
          <img class="img-fluid" src="/graphics/getting_started/cloud.png"/>
        </div>
        <div class="flex-auto col-md-6 col-sm-12 p-4 text-center text-md-left">
          <h3>One Click Publishing</h3>
          <p>Qri Desktop lets you to easily publish datasets on <a href="https://qri.cloud">qri.cloud</a>, our dataset discovery and collaboration service. Go from data file on your computer to published qri dataset in under a minute.</p>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-6 col-sm-12 p-4 text-center text-md-right">
          <img class="img-fluid" src="/diagrams/data_exchange_2.svg"/>
        </div>
        <div class="col-md-6 col-sm-12 p-4 text-center text-md-left">
          <h4>Distributed Data is Healthy Data</h4>
          <p>Qri is a data commons, where many people exchange many datasets.  More eyeballs on your dataset means spotting errors sooner, discovering new use cases, and a feedback loop between data publishers and consumers.</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center my-5">
          <a class="btn btn-qri-dark-blue text-white" href="https://github.com/qri-io/desktop" target="_blank">
            <i class="fab fa-github"></i> &nbsp; Follow Qri Desktop on Github
          </a>
        </div>
      <div class="row d-md-flex flex-items-center flex-md-row-reverse">
    </div>
  </div>
  <script>
    const el = document.documentElement;
    if (navigator.platform.match(/(Mac)/i)) {
      el.className = 'mac'
    }
  </script>
</div>
