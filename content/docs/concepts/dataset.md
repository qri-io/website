---
title: "Datasets"
description: "what's a dataset?"
date: 2018-01-30T00:00:00-04:00
weight: 2
---

# Datasets: Qri's Building Block
<style>
  #dataset_components { 
    position: relative;
    margin-bottom: 120px;
  }
  .diagram {
    max-width: 260px;
    margin: 60px auto;
    padding: 40px 0;
  }
  .descriptions { position: absolute; } 
  .right.descriptions { right: 0; top: 0; text-align: right; }

  .description { 
    display: block;
    padding: 5px 8px;
    margin: 20px 0;
    border-radius: 6px;
    background: white;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    transition: all 0.5s;
    width: 220px;
    color: #666;
    line-height: 1.2em;
  }
  .description:hover {
    box-shadow: 0 5px 6px rgba(0,0,0,0.2);
    color: white;
  }
  .description h4 { margin: 0 }
  
  #commit h4 { color: #a8c7d3; }
  #viz h4 { color: #ec325a; }
  #body h4 { color: #afd148; }
  #meta h4 { color: #f8ab31; }
  #transform h4 { color: #338092; }
  #structure h4 { color: #4fc7f3; }

  #commit:hover { background: #a8c7d3; }
  #commit:hover h4 { color: white; }
  #viz:hover { background: #ec325a; }
  #viz:hover h4 { color: white; }
  #body:hover { background: #afd148; }
  #body:hover h4 { color: white; }
  #meta:hover { background: #f8ab31; }
  #meta:hover h4 { color: white; }
  #transform:hover { background: #338092; }
  #transform:hover h4 { color: white; }
  #structure:hover { background: #4fc7f3; }
  #structure:hover h4 { color: white; }

</style>

<div id="dataset_components">
  <div class="left descriptions">
    <a href="/docs/reference/dataset#commit" id="commit" class="description">
      <h4 class="commit">Commit</h4>
      <p>versioning & attribution for this dataset at a specific point in time</p>
    </a>
    <a href="/docs/reference/dataset#viz" id="viz" class="description">
      <h4 class="viz">Viz</h4>
      <p>template details for visually representing this dataset</p>
    </a>
    <a href="/docs/reference/dataset#body" id="body" class="description">
      <h4 class="body">Body</h4>
      <p>"the data". All other components are about the body.</p>
    </a>
  </div>

  <div id="diagram" class="diagram">
    <img src="/diagrams/dataset_document.png">
  </div>

  <div class="right descriptions">
    <a href="/docs/reference/dataset#meta" id="meta" class="description">
      <h4 class="meta">Meta</h4>
      <p>descriptive metadata based on the DCAT specification</p>
    </a>
    <a href="/docs/reference/dataset#transform" id="transform" class="description">
      <h4 class="transform">Transform</h4>
      <p>an embedded script for updating this dataset</p>
    </a>
    <a href="/docs/reference/dataset#structure" id="structure" class="description">
      <h4 class="structure">Structure</h4>
      <p>machine-oriented metadata for interpreting body, including a schema.</p>
    </a>
  </div>
</div>

Datasets are recorded structured data. By design, Qri can only store datasets. Unlike general version control systems, all datasets stored in qri can interoperate because they are the same kind of document. Datasets are stored & transmitted in standard data formats (eg. JSON, CSV), allowing outside systems to bypass qri entirely to interact directly with datasets qri produces & consumes.

Datasets are defined to have the following properties by default:

* **Versioned** datasets have git-like version histories that track
* **Attributed** all changes are signed with keypair cryptography
* **Archival** all datasets are immutable, timestamped, and identified by their hash
* **Interoperable** datasets can be exported & converted to different data formats
* **Tolerant** datasets are designed to still work when data is invalid, or use little-to-no schema definition.

A Dataset can theoretically be any size, but in these early stages we're targeting datasets that are 1Gig and under in size. We're doing work today that will allow datasets to function at any scale.
