+++
title = "Deterministic Querying"
date = "2017-11-20T00:00:00-04:00"
description = "The current infrastructure that underlies the distribution and processing of data over the Internet has enabled dramatic advances in a wide variety of human activities. Recent trends promoting open data promise even greater benefits as the number and variety of networked datasets grow. However, while current technologies and architectures obviously do work, they also show signs of systemic inefficiencies that impede effective large-scale discovery, distribution, preservation and reuse of datasets. An important source of inefficiency is rooted in the database-centric architecture that underlies much of data processing on the Internet today. The transition to a content-addressed permanent web offers an opportunity to replace certain software architecture patterns with alternatives that are more efficient and scale more effectively. We introduce one such new pattern, <em>deterministic querying</em>, that combines formalized query definitions, formalized data descriptions, linked metadata, hashing, and a content-addressed file system. The result supports database-free reuse of data and data processing results—and can do so on the scale of the global Internet."
type = "paper"
+++

<body>
<article class="markdown-body">
<h1 align="center">
Deterministic Querying for the Distributed Web
</h1>
<p align="center">
<a href="http://www.brendan.nyc">Brendan O’Brien</a><br> <a href="http://www.cds.caltech.edu/~mhucka/">Michael Hucka</a>
</p>
<p align="center">
November 2017<br/>
</p>
<p align="center">
<b>Abstract</b>
</p>
<p>The current infrastructure that underlies the distribution and processing of data over the Internet has enabled dramatic advances in a wide variety of human activities. Recent trends promoting open data promise even greater benefits as the number and variety of networked datasets grow. However, while current technologies and architectures obviously do work, they also show signs of systemic inefficiencies that impede effective large-scale discovery, distribution, preservation and reuse of datasets. An important source of inefficiency is rooted in the database-centric architecture that underlies much of data processing on the Internet today. The transition to a content-addressed permanent web offers an opportunity to replace certain software architecture patterns with alternatives that are more efficient and scale more effectively. We introduce one such new pattern, <em>deterministic querying</em>, that combines formalized query definitions, formalized data descriptions, linked metadata, hashing, and a content-addressed file system. The result supports database-free reuse of data and data processing results—and can do so on the scale of the global Internet.</p>
<div>
<p align="center">
<b>Table of Contents</b><br> <ul>
<li><a href="#introduction"><span class="toc-section-number">1</span> Introduction</a><ul>
<li><a href="#the-open-source-advantage"><span class="toc-section-number">1.1</span> The open-source advantage</a></li>
<li><a href="#databases-and-modern-software-stacks"><span class="toc-section-number">1.2</span> Databases and modern software stacks</a></li>
<li><a href="#reimagining-distributed-open-data"><span class="toc-section-number">1.3</span> Reimagining distributed open data</a></li>
</ul></li>
<li><a href="#data-data-structures-hashes-and-queries"><span class="toc-section-number">2</span> Data, data structures, hashes, and queries</a><ul>
<li><a href="#data-and-structure"><span class="toc-section-number">2.1</span> <code>Data</code> and <code>Structure</code></a></li>
<li><a href="#dataset"><span class="toc-section-number">2.2</span> <code>Dataset</code></a></li>
<li><a href="#query"><span class="toc-section-number">2.3</span> <code>Query</code></a></li>
<li><a href="#query-execution"><span class="toc-section-number">2.4</span> Query execution</a></li>
<li><a href="#query-output"><span class="toc-section-number">2.5</span> Query output</a></li>
<li><a href="#hash-collision-and-discovery"><span class="toc-section-number">2.6</span> Hash Collision and Discovery</a></li>
<li><a href="#structure-and-query-analysis"><span class="toc-section-number">2.7</span> Structure and Query Analysis</a></li>
</ul></li>
<li><a href="#metadata"><span class="toc-section-number">3</span> Metadata</a><ul>
<li><a href="#metadata-in-dataset"><span class="toc-section-number">3.1</span> Metadata in <code>Dataset</code></a></li>
<li><a href="#requirements-for-metadata-interoperability"><span class="toc-section-number">3.2</span> Requirements for metadata interoperability</a></li>
</ul></li>
<li><a href="#integration-with-linked-data-and-linked-open-data"><span class="toc-section-number">4</span> Integration with Linked Data and Linked Open Data</a><ul>
<li><a href="#linking-to-other-distributed-frameworks"><span class="toc-section-number">4.1</span> Linking to other distributed frameworks</a></li>
</ul></li>
<li><a href="#storage-efficiency"><span class="toc-section-number">5</span> Storage efficiency</a><ul>
<li><a href="#leveraging-the-properties-of-ipfs"><span class="toc-section-number">5.1</span> Leveraging the properties of IPFS</a></li>
<li><a href="#implementing-efficient-file-decomposition-strategies"><span class="toc-section-number">5.2</span> Implementing efficient file decomposition strategies</a></li>
</ul></li>
<li><a href="#properties-of-deterministic-querying"><span class="toc-section-number">6</span> Properties of deterministic querying</a><ul>
<li><a href="#discoverability"><span class="toc-section-number">6.1</span> Discoverability</a></li>
<li><a href="#immutability-and-defensibility"><span class="toc-section-number">6.2</span> Immutability and defensibility</a></li>
<li><a href="#software-independence"><span class="toc-section-number">6.3</span> Software independence</a></li>
</ul></li>
<li><a href="#conclusion"><span class="toc-section-number">7</span> Conclusion</a></li>
<li><a href="#references"><span class="toc-section-number">8</span> References</a></li>
</ul>
</p>
</div>
<h1 id="introduction"><span class="header-section-number">1</span> Introduction</h1>
<p>It is by now a cliché to say that we live in an information-rich world. Though exact numbers are unavailable for the amount of electronic data stored around the world, it is clear it must already be stupendous. Measured in terms of web pages, the best estimate in mid-2017 puts the number of visible web pages at nearly 50 billion <span class="citation">[Bosch et al. <a href="#ref-vandenbosch2016estimating">2016</a>]</span>, while in terms of data transmitted over the Internet, global IP traffic was estimated at 1.2 zettabytes in 2016 and is predicted to reach 3.3 zettabytes per year by 2021 <span class="citation">[Cisco <a href="#ref-cisco2017zettabyte">2017</a>]</span>.</p>
<p>In the business, government, and academic sectors, making data sets freely available under open terms is not a new development historically, but it has in recent years accelerated. While there is no way to know what proportion of the total data visible today is open data rather than private data, even a small fraction would translate to a tremendous amount. This is a welcome development: open data is a boon to research and progress <span class="citation">[Gewin <a href="#ref-gewin2016data">2016</a>; Lowndes et al. <a href="#ref-lowndes2017our">2017</a>; Miguel et al. <a href="#ref-miguel2014promoting">2014</a>; Murray-Rust <a href="#ref-murray2008open">2008</a>; Piwowar and Vision <a href="#ref-piwowar2013data">2013</a>]</span>. The continuing growth of data being made available on the Internet promises a windfall of benefits in many areas, enabling new discoveries, powering new innovations, lowering costs, and increasing transparency <span class="citation">[Ferguson et al. <a href="#ref-ferguson2014big">2014</a>; Kansakar and Hossain <a href="#ref-kansakar2016review">2016</a>; Madan <a href="#ref-madan2017advances">2017</a>; Martin and Begany <a href="#ref-martin2017opening">2017</a>; McKiernan et al. <a href="#ref-mckiernan2016open">2016</a>; Uhlir and Schröder <a href="#ref-uhlir2007open">2007</a>; West et al. <a href="#ref-west2014open">2014</a>]</span>.</p>
<p>The open data movement has in part been inspired by and driven by the open <em>source</em> movement, and many of the principles espoused by open data advocates mirror those of open source efforts <span class="citation">[Baack <a href="#ref-baack2015datafication">2015</a>]</span>. At the heart of both movements is the understanding that collective collaboration drives collective benefits. However, open source has developed methods that are arguably more effective than comparable methods used in open data today. In particular, open source developers have effective methods for structuring their work in <em>composable packages intended for reuse</em>. We argue that the comparable operations in open data today are cumbersome and inefficient due to the prevailing system architectures and design patterns in use.</p>
<h2 id="the-open-source-advantage"><span class="header-section-number">1.1</span> The open-source advantage</h2>
<p>In open source, developers are encouraged to share their work, and to seek out existing solutions to problems before developing new solutions <span class="citation">[Bergquist and Ljungberg <a href="#ref-bergquist2001power">2001</a>; Crowston et al. <a href="#ref-crowston2008free">2008</a>; Sojer and Henkel <a href="#ref-sojer2010code">2010</a>]</span>. As a result, open source software builds upon other software, often by composing larger works out of smaller, reusable elements <span class="citation">[Haefliger et al. <a href="#ref-haefliger2008code">2008</a>]</span>. This is possible because software elements—objects, functions, programs, modules—can be reused as static entities incorporated into other works. The software elements represent intellectual labor: they are answers to questions. Open-source developers solve new problems in part by seeking out answers to old questions and then using those answers to build their solutions. This approach works well in software partly because developers have created a concise lexicon to describe the questions, the forms of the answers, and how to store and exchange them. The questions and answers are defined by specific input and output conventions; storage, versioning, search and sharing is accomplished by revision control systems such as <em>git</em>; and composition is achieved by linking source code together into larger works.</p>
<p>In open data, the situation is more diverse and the steps are more inefficient. The most coherent framework for data reuse is Linked Data <span class="citation">[Auer et al. <a href="#ref-auer2014linked">2014</a>; Heath and Bizer <a href="#ref-heath2011linked">2011</a>]</span>. This involves databases serving content on the Internet in RDF format <span class="citation">[e.g., Maali et al. <a href="#ref-maali2012publishing">2012</a>]</span>; search and discovery is aided by some topical catalogs <span class="citation">[e.g., Pesce et al. <a href="#ref-pesce2015setting">2015</a>]</span>. Consumers can query and reference the content in the databases, often by creating pipelines to access, translate and process the data at the user end <span class="citation">[e.g., Klímek et al. <a href="#ref-klimek2016linkedpipes">2016</a>]</span>. However, Linked Data sources remain a minority today—most data sources are shared using the far simpler approach of exposing a network API that enables users to search and access content stored in databases. The heterogeneity of the APIs and data formats in these cases complicates reuse of data and pushes complexity to individual users.</p>
<p>Whether using Linked Data or more conventional networked databases, it is important to note that different users often end up recreating the same solutions over and over. The pattern is that a computing system is built to consume datasets, translate the data, perform operations on the data, and then interpret the results. Sometimes the results are stored in a <em>local</em> (not shared) database, usually in a different format than the source format; other times, the intermediate data produced by the operations is thrown away because the processed data is either assumed to be of no value to anyone else, or else the cost of storing, managing and sharing intermediate results is assumed to be higher than simply recomputing them on demand.</p>
<p>The consequence is that answers to questions are often not being shared, discovered or reused by other potential users of open data.</p>
<h2 id="databases-and-modern-software-stacks"><span class="header-section-number">1.2</span> Databases and modern software stacks</h2>
<!-- might work in citation to muir et al 2016 for how amount of data affects computation needs -->
<p>Central to the problem of treating open data as reusable components is that there is no commonly-accepted method for <em>composition</em>. That is, using the <em>output</em> of an open data process as the <em>input</em> to another open data process when the processes are not part of a common pipeline. Methods for reusing computational results in distributed workflows do exist, but they are specific to particular execution environments or frameworks <span class="citation">[e.g., Elghandour and Aboulnaga <a href="#ref-elghandour2012restore">2012</a>]</span>. No common scheme exists for persisting and reusing results of computations produced by widely-used software stacks such as those within today’s web applications—the applications that power so many cloud-based services.</p>
<p>The architectural patterns underlying modern software stacks are part of the problem. One of the greatest barriers to efficient reuse of results is the <em>positioning of the database</em>. In many cases, the database is placed at the heart of a modern web-based application. Data is stored in the database in a raw form, but then must be encoded into whatever form is consumed by the user at access time. This approach of <em>interpreting the data outward</em> towards the user makes perfect sense when the primary “view” or representation of this data is in the form of structured HTML:</p>
<pre><code>  Database -&gt; Process (HTML Render) -&gt; Network -&gt; Web Browser</code></pre>
<p>From there, a common next step is to provide programmatic access to this data via an HTTP API, which is essentially another “view” on the same central database:</p>
<pre><code>  Database -&gt; Process (API Encode) -&gt; Network -&gt; API Decode</code></pre>
<p>This approach is flexible, and there is no question that it works—after all, it serves as the basis of many software systems. However, this approach is the product of a long history of accumulated technical contexts, some of which are now the source of a great deal of inefficiency. Consider what happens when the results of a data service are processed by another service:</p>
<pre><code>  Database -&gt; Process (API Encode) -&gt; Network -&gt; Process (API Decode) -&gt; Database</code></pre>
<p>In today’s software environments, this pattern uses multiple servers to take data out of one database, serve it across a network, decode, process, and put it into another database (which requires additional encoding if the output of the processing does not match how it is stored in the database—and it often does not). Since the amount of computing needed to process data grows with the amount of data <span class="citation">[e.g., Muir et al. <a href="#ref-muir2016real">2016</a>]</span> and the amount of data generated by human activity grows continually, the amount of resources expended on this inefficient arrangement continues to increase. Of greater concern is that every step requires separate engineering and long-term software maintenance. The pattern favors holding the data as closed information because “opening” the data is an active effort that would require additional engineering time, CPU cycles, etc.</p>
<p>This “database in the middle” pattern is the result of serving the needs of <em>application data</em>, or data that mainly serves as structured state storage for software. When referring to open data, the data in question is often <em>research data</em>, that is, data whose primary purpose is to be mined and probed for insights. There is no doubt that many types of data can be both application and research data, but the vast majority of databases are built to favor application data, prioritizing speed and efficiency of query execution with little-to-no concern for what is done with the results of a query.</p>
<p>While speed and efficiency of query execution is certainly a concern for research data, a number of other factors take up far more time than the queries themselves. Finding, cleaning, and preparing a dataset often takes far longer than querying <span class="citation">[García et al. <a href="#ref-Garcia2016-gv">2016</a>; Lohr <a href="#ref-Lohr2014-aq">2014</a>; Rogers <a href="#ref-Rogers2013-hx">2013</a>]</span>, and there is no clear method for storing, distributing, and composing the resulting datasets, queries, and their results.</p>
<h2 id="reimagining-distributed-open-data"><span class="header-section-number">1.3</span> Reimagining distributed open data</h2>
<p>If it were possible to short-circuit some of the steps in the architectural pattern above, it could be made more efficient, at least for certain use cases. For example, what if the decoding steps could be removed? For that matter, what if the databases could be removed too, and the network itself somehow could be the database for both storage and querying? Then the process diagram would look like this:</p>
<pre><code>  Network -&gt; Process -&gt; Network</code></pre>
<p>The idea that the network itself could be “queried for data” as if it were a database may seem ludicrous at first. The rest of this white paper describes how this <em>can</em> be achieved, using a combination of technologies and architectural patterns. Renewed attention to distributed, content-addressed networks with a robust linked-data structure provides the foundation necessary for achieving this. What follows is a plan for a suite of tools that collectively provide the necessary components to be able to query a network, with the explicit design goal of facilitating <em>accumulation of composable results</em> through data that is held on the network.</p>
<!--
maybe add more about linked data:

Linked Data is explicitly oriented towards providing data as a service: URIs need to get resolved, data sources get queried, data is retrieved, and (usually) data needs to be translated.  These methods of querying and accessing Linked Data currently involve database access and retrieval.

maybe also compare this to "network is the database" -->
<h1 id="data-data-structures-hashes-and-queries"><span class="header-section-number">2</span> Data, data structures, hashes, and queries</h1>
<p><em>Deterministic querying</em> is designed for content-addressed network systems. In content-based addressing, data is stored and retrieved not by its location (as is done in the current Web via HTTP), but rather by a function computed over its content—specifically, a hash function that uniquely identifies the content <span class="citation">[Aurora <a href="#ref-aurora2007code">2007</a>]</span>. This <em>content address</em> can be computed independently by anyone for any content simply by running the hash function; they do not require a centralized authority to coordinate the assignment of labels or addresses. This decentralized approach is the foundation of an emerging, modern, reliable data commons that deterministic querying aims to support.</p>
<p>Content-based addressing, also known as compare-by-hash <span class="citation">[Aurora <a href="#ref-aurora2007code">2007</a>]</span>, was first used for networked file systems in the early 2000’s <span class="citation">[Muthitacharoen et al. <a href="#ref-muthitacharoen2001low">2001</a>; Tolia et al. <a href="#ref-tolia2003opportunistic">2003</a>]</span>, and is a staple of peer-to-peer systems today. In this work, we specifically target IPFS (the InterPlanetary File System), an open-source, distributed, content-addressed, peer-to-peer, versioned file system and protocol <span class="citation">[Benet <a href="#ref-benet2014ipfs">2014</a>; Protocol Labs <a href="#ref-ipfs2017">2017</a><a href="#ref-ipfs2017">a</a>]</span>. IPFS distributes content over a network using a secure distributed hash table <span class="citation">[Baumgart and Mies <a href="#ref-baumgart2007s">2007</a>; Freedman et al. <a href="#ref-freedman2004democratizing">2004</a>; Maymounkov and Mazieres <a href="#ref-maymounkov2002kademlia">2002</a>]</span>. The basic premise of IPFS and other content-addressed file systems is that identical content will produce identical hash values, and thus be identified uniquely.</p>
<p>A fundamental goal of deterministic querying is to <em>maximize hash collisions</em> in content-addressed networks, because hash collisions are what enable discovery and reuse of existing results. The techniques described below are designed to ensure that datasets with identical characteristics, as well as semantically-equivalent queries for datasets, each resolve to the same hash even if the datasets and queries are created by different parties in different locations at different times. These shared characteristics form a common lexicon that peers in a distributed network can use to compare datasets—and do that on an Internet-scale graph.</p>
<p>To maximize these hash collisions, the process of describing datasets and queries must be made precise and consistent. To the greatest extent possible, content and queries that are the same must produce the same hash value; thus, definitions of data resources and queries must follow carefully-defined conventions, and alternative forms must be limited. We compensate for this rigidity by storing nonessential data separately, then connecting that to datasets and queries using separate mechanisms for linking and discovery. This leads to the four building blocks of deterministic querying: <code>Data</code>, <code>Dataset</code>, <code>Structure</code>, and <code>Query</code>.</p>
<p align="center">
<img width="500pt" src="/graphics/data-dataset-structure-query.svg">
</p>
<h2 id="data-and-structure"><span class="header-section-number">2.1</span> <code>Data</code> and <code>Structure</code></h2>
<!--
This section could be called "schemas" or even "resources"; we avoid these terms because they are overused and may evoke unwanted associations.
-->
<p>In the context of deterministic querying, <code>Data</code> has its natural meaning: a collection of raw values of <em>something</em>—numerical values, qualitative values, anything—organized in some systematic way. An example file format for storing data today is the venerable comma-separated values (CSV) format, which consists of rows of numerical or text values separated by commas, with an optional first line containing column headings. Here is a fictitious example dataset named <code>precip</code>:</p>
<pre><code>lat,lng,precip_amt,date,note
60.00,-50.049303,0,2017-02-14,no precip to report
60.00,-50.049303,1014,2017-02-15,two storm cells observed
...</code></pre>
<p>A <code>Data</code> object in a content-addressed file system will be a static object identified by a hash value (henceforth, to be called simply its <em>hash</em>). Assume that this data file resolves to the following base58-encoded <span class="citation">[Gagern et al. <a href="#ref-vonGagern2017base58">2017</a>]</span> hash on the network:</p>
<pre><code>QmNk2XkDpn8vBantgpHt6B52kcyfHcQVJUF4QzDqjiGu52</code></pre>
<p>As discussed above, this hash will be unique: any file whose computed hash matches the one above <em>will contain the same content</em>, no matter how or where it was created (assuming we use the same conventions for line endings, spaces and some other details), or where it’s physically located in the content-addressed file system. Queries to this data file will always run against the same set of bytes because the hash is <em>deterministic</em>.</p>
<p>Being able to interpret the bytes contained inside a given <code>Data</code> object requires additional information outside of the <code>Data</code> itself. This information is needed to provide precise details about how to interpret the content of a <code>Data</code> object. That is the purpose of <code>Structure</code>. It contains fields that indicate such things as the format of a <code>Data</code> object, the character encoding, compression settings, and other details. Here is an example expressed in a human-readable JSON format:</p>
<div class="sourceCode"><pre class="sourceCode json"><code class="sourceCode json"><span class="fu">{</span>
  <span class="dt">&quot;qri&quot;</span> <span class="fu">:</span> <span class="st">&quot;1.0&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;format&quot;</span> <span class="fu">:</span> <span class="st">&quot;text/csv&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;formatConfig&quot;</span> <span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;delimiter&quot;</span><span class="fu">:</span> <span class="st">&quot;,&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;doubleQuote&quot;</span><span class="fu">:</span> <span class="kw">true</span><span class="fu">,</span>
    <span class="dt">&quot;lineTerminator&quot;</span><span class="fu">:</span> <span class="st">&quot;</span><span class="ch">\r\n</span><span class="st">&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;quoteChar&quot;</span><span class="fu">:</span> <span class="st">&quot;</span><span class="ch">\&quot;</span><span class="st">&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;skipInitialSpace&quot;</span><span class="fu">:</span> <span class="kw">true</span><span class="fu">,</span>
    <span class="dt">&quot;header&quot;</span><span class="fu">:</span> <span class="kw">true</span>
  <span class="fu">},</span>
  <span class="dt">&quot;encoding&quot;</span> <span class="fu">:</span> <span class="st">&quot;utf-8&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;compression&quot;</span> <span class="fu">:</span> <span class="st">&quot;gzip&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;schema&quot;</span> <span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;fields&quot;</span> <span class="fu">:</span> <span class="ot">[</span>
      <span class="fu">{</span> <span class="dt">&quot;title&quot;</span> <span class="fu">:</span> <span class="st">&quot;lat&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span> <span class="fu">:</span> <span class="st">&quot;float&quot;</span><span class="fu">,</span> <span class="dt">&quot;default&quot;</span> <span class="fu">:</span> <span class="dv">0</span> <span class="fu">}</span><span class="ot">,</span>
      <span class="fu">{</span> <span class="dt">&quot;title&quot;</span> <span class="fu">:</span> <span class="st">&quot;lng&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span> <span class="fu">:</span> <span class="st">&quot;float&quot;</span><span class="fu">,</span> <span class="dt">&quot;default&quot;</span> <span class="fu">:</span> <span class="dv">0</span> <span class="fu">}</span><span class="ot">,</span>
      <span class="fu">{</span> <span class="dt">&quot;title&quot;</span> <span class="fu">:</span> <span class="st">&quot;precip_amt&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span> <span class="fu">:</span> <span class="st">&quot;integer&quot;</span><span class="fu">,</span> <span class="dt">&quot;default&quot;</span> <span class="fu">:</span> <span class="dv">0</span> <span class="fu">}</span><span class="ot">,</span>
      <span class="fu">{</span> <span class="dt">&quot;title&quot;</span> <span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span> <span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span><span class="fu">,</span> <span class="dt">&quot;default&quot;</span> <span class="fu">:</span> <span class="dv">0</span> <span class="fu">}</span><span class="ot">,</span>
      <span class="fu">{</span> <span class="dt">&quot;title&quot;</span> <span class="fu">:</span> <span class="st">&quot;note&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;string&quot;</span><span class="fu">,</span> <span class="dt">&quot;default&quot;</span><span class="fu">:</span> <span class="st">&quot;&quot;</span> <span class="fu">}</span>
    <span class="ot">]</span>
  <span class="fu">},</span>
<span class="fu">}</span></code></pre></div>
<p>The detailed specification of <code>Structure</code> is given elsewhere, but as the example above illustrates, a <code>Structure</code> contains information that enables software and users to read the content of a <code>Data</code> object. For example, <code>format</code> specifies how the data is stored; the field value is a MIME type value (e.g., <code>&quot;text/csv&quot;</code> for CSV <span class="citation">[Shafranovich <a href="#ref-shafranovich2005common">2005</a>]</span>). The related field <code>formatConfig</code> removes as much ambiguity as possible about how to interpret the specified <code>format</code> because some formats have a number of dialects, and variants need to be identified exactly.</p>
<p>The field <code>schema</code> merits some additional explanation. Many formats such as CSV do not internally define the data types of values and provide no standard way of communicating this information, which forces the requirement to define an approach for externalizing it outside of a <code>Data</code> file. It turns out, however, that describing the format explicitly in a generalized way also makes it possible to store and reuse those descriptions independently: they become another object in the content-addressed storage space, hashed and stored like everything else. The structure of <code>schema</code> is intended to be as interoperable as possible with the frictionless data specification <span class="citation">[Frictionless Data <a href="#ref-frictionlessdata2017">2017</a>]</span>, which has made great inroads in this area.</p>
<p><code>Structure</code> is designed in such a way that it contains nothing about the <em>meaning</em> of the data. This has the benefit that if the values of a <code>Data</code> file change, the <code>Structure</code> can remain the same; if multiple <code>Data</code> objects anywhere on an IPFS network all have the same structure, the <code>Structure</code> object can remain the same. This is true even if the <code>Data</code> objects are about entirely different things_. As will become more clear below, this is part of the fundamental insight that makes deterministic querying possible.</p>
<p>While we focus on the CSV data format, these concepts apply just as easily to other data formats, and the structure specification is designed to accommodate this interoperability. JSON, XML, Microsoft Excel(TM) Spreadsheets, sqlite files, are all examples of formats that <code>Structure</code> should be able to normalize by using the same general approach.</p>
<h2 id="dataset"><span class="header-section-number">2.2</span> <code>Dataset</code></h2>
<p>A <code>Structure</code> describes the form of a <code>Data</code> object. The two are connected together, along with metadata about the <code>Data</code>, in a <code>Dataset</code> object.</p>
<p align="center">
<img width="150pt" src="/graphics/dataset.svg">
</p>
<p>As illustrated above, a <code>Dataset</code> references one <code>Data</code> and one <code>Structure</code> object, and it also adds additional descriptive metadata. A <code>Dataset</code> must resolve to one and only one <code>Data</code> entity; this is accomplished by using the unique hashes of the associated <code>Data</code> and <code>Structure</code> objects. This separation of concerns achieves two important goals:</p>
<ol style="list-style-type: decimal">
<li><p>The same data can be described by different metadata. For example, a repeated experiment may produce identical data, but it should be described differently if only to indicate different time stamps or conditions. Separating the description from the values saves storage and bandwidth because only the changes (the metadata) are stored separately.</p></li>
<li><p>Metadata formats can be changed and updated independently. In many cases, data remains static after it is gathered. Software frameworks, however, often change rapidly, and developers and users find needs to change and update metadata about data. With the separation described here, metadata can be changed without changing the underlying data objects. This not only saves resources: it makes clear in a concrete way that <em>it is the same data</em>.</p></li>
</ol>
<p>To retain a trail of changes, <code>Dataset</code> contains a field called <code>previous</code> that references the hash of another <code>Dataset</code> object. This establishes a directed, acyclic graph (DAG) of changes to any component of a dataset, whether this is the metadata, or the <code>Data</code>, or the <code>Structure</code>. For example, when changes are made to metadata without changing the <code>Data</code> or its <code>Structure</code>, only the <code>Dataset</code> object needs to change:</p>
<p align="center">
<img width="400pt" src="/graphics/metadata-changes.svg">
</p>
<p>Conversely, if the <code>Data</code> changes but the <code>Structure</code> does not, the new <code>Dataset</code> object will reference the hash of a new <code>Data</code> object but point to the same <code>Structure</code>:</p>
<p align="center">
<img width="400pt" src="/graphics/data-changes.svg">
</p>
<p>Finally, if the <code>Structure</code> changes, the <code>Data</code> <em>may</em> need to change as well, if the structural change affects how the data is read or written. When the <code>Structure</code> change <em>does</em> require a <code>Data</code> change, it is a schema <em>migration</em>. A new <code>Dataset</code> object is created and it points to two new <code>Structure</code> and <code>Data</code> objects. This indicates that the underlying dataset has changed in such a way—either in structure or in values—that its hash signature is no longer the same.</p>
<p align="center">
<img width="400pt" src="/graphics/structure-changes.svg">
</p>
<p>In each case above, the <code>Dataset</code> identifies the unique <code>Structure</code> object that defines the format of the data in the <code>Data</code> object(s), and the value of the <code>previous</code> has points to any previous <code>Dataset</code> definition that may have come before.</p>
<p>There are additional fields in <code>Dataset</code>; these are discussed further below.</p>
<h2 id="query"><span class="header-section-number">2.3</span> <code>Query</code></h2>
<p>In the abstract, information retrieval is a process of obtaining information from resources by posing questions <span class="citation">[Sanderson and Croft <a href="#ref-sanderson2012history">2012</a>]</span>. In contemporary computer terms, those “questions” are expressed in some formal language and acted upon by computer programs. Information can be retrieved from many different kinds of resources; when the resources are databases, we speak of <em>database queries</em>. We focus initially on the world’s most widely-used database query language, SQL (Structured Query Language), which has a long history <span class="citation">[Chamberlin <a href="#ref-chamberlin2009sql">2009</a>]</span>, a syntax standardized by ISO <span class="citation">[ISO/IEC JTC 1/SC 32 <a href="#ref-iso2016sql">2016</a>]</span>, and is the basis of many database-powered software systems in the world today. As will become clear, the approach described here is not limited to SQL—any query language syntax that obeys similar principles and can be processed in similar ways can be used in deterministic queries.</p>
<p>Queries written in SQL make reference to columns in a tabular database, and express conditions that values must satisfy in order to be selected. Here is an example from the <code>precip</code> dataset referenced above:</p>
<div class="sourceCode"><pre class="sourceCode sql"><code class="sourceCode sql"><span class="kw">SELECT</span> datestamp, lat, lng, precip_amt <span class="kw">FROM</span> precip <span class="kw">WHERE</span> precip_amt &gt; <span class="dv">1000</span></code></pre></div>
<p>This query references a table in a database (<code>precip</code>) and columns within that table (<code>datestamp</code>, <code>lat</code>, <code>lng</code>, <code>precip_amt</code>), and stipulates a conditional expression (<code>precip_amt &gt; 1000</code>) that certain column values must satisfy. Note that this query knows nothing about the purpose of the database: all that matters is that the table has four columns and the expression <code>precip_amt &gt; 1000</code> makes syntactic sense for the kinds of values in the table. Although labels such as <code>lat</code>, <code>lng</code> and <code>precip</code> may have meaning to human readers, in reality the labels in SQL have absolutely no semantic meaning to the database itself. This concept is nothing new—it is by design in SQL, so that database systems can be applied to many uses and types of data.</p>
<p>Now suppose we separate the query from the dataset it is referring to in such a way that the query is written in an abstract, data-agnostic way, and the binding of table columns in the query to table columns in an actual dataset is maintained separately. This <em>abstract query</em> can be written by establishing some conventions. We replace the concrete table name <code>precip</code>, with an abstract identifier: <code>a</code>, and repeat the process for table columns, replacing concrete column names with <code>col_0</code>, <code>col_1</code>, <code>col_2</code>, etc. We also strip out any ambiguity by adding the table name to each column reference, leaving us with the following abstract query:</p>
<div class="sourceCode"><pre class="sourceCode sql"><code class="sourceCode sql"><span class="kw">SELECT</span> a.col_3, a.col_0, a.col_1, a.col_2 <span class="kw">FROM</span> a <span class="kw">WHERE</span> a.col_2 &gt; <span class="dv">1000</span></code></pre></div>
<p>Now further suppose that we define the shape of table <code>a</code> by writing an abstracted form of the <code>Structure</code> object, described above. This defines precisely the types of data values expected for each column in the query, as well as other properties of the data. And naturally, we can do the same for the <em>result</em> of the query: use another <code>Structure</code> object to describe the form of the data that the query will produce.</p>
<p align="center">
<img width="500pt" src="/graphics/query.svg">
</p>
<p>This query is now independent of the semantics of the data: it operates on the form of the data and can be applied to any data that matches the description in the <code>Structure</code> of the input. What’s more, assuming that we define clear rules for writing these queries in a standard, consistent form, the same query will <em>always have the same hash value</em> even if it is regenerated by different processes at different times in different locations. And of course, the <code>Structure</code> objects for both the input and output are defined by their hashes.</p>
<div class="sourceCode"><pre class="sourceCode json"><code class="sourceCode json"><span class="fu">{</span>
  <span class="dt">&quot;qri&quot;</span> <span class="fu">:</span> <span class="st">&quot;1.0&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;inputStructures&quot;</span> <span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;a&quot;</span> <span class="fu">:</span> <span class="st">&quot;/ipfs/QmNxLFUUvPEY55E1DGLmBKJa51CmHAuoUqfLE6CetxqvvV&quot;</span><span class="fu">,</span>
  <span class="fu">},</span>
  <span class="dt">&quot;syntax&quot;</span> <span class="fu">:</span> <span class="st">&quot;application/sql&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;statement&quot;</span> <span class="fu">:</span> <span class="st">&quot;SELECT a.col_3, a.col_0, a.col_1, a.col_2 FROM a WHERE a.col_2 &gt; 1000&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;outputStructure&quot;</span> <span class="fu">:</span> <span class="st">&quot;/ipfs/QmP6XohRBYc8y52dpyJsANYq1SZBzy618t388Wk2SPKNG9&quot;</span>
<span class="fu">}</span></code></pre></div>
<p>The field <code>syntax</code> is a MIME media type string <span class="citation">[Freed et al. <a href="#ref-freed2013media">2013</a>]</span> indicating the syntax of the query statement. The media type for SQL <span class="citation">[Shafranovich <a href="#ref-shafranovich2013application">2013</a>]</span> is used here as an example.</p>
<h2 id="query-execution"><span class="header-section-number">2.4</span> Query execution</h2>
<p>Executing a query is conceptually simple, and requires only a consistent procedure for the process. After a user’s database query is obtained from an external mechanism (such as a user interface, or another software system), a query engine can proceed roughly as follows:</p>
<ol style="list-style-type: decimal">
<li><p>The result of processing a query will be a <code>Dataset</code> object, so query processing begins with a blank <code>Dataset</code>. The query processing engine records the original, concrete query expression in the field <code>queryString</code>. The data referenced by the query are recorded as in the field <code>resources</code> as a set of other <code>Dataset</code> objects.</p></li>
<li><p>The original query is parsed to produce internal Abstract Syntax Tree (AST) representation (a standard approach for parsing and manipulating structured languages).</p></li>
<li><p>The query engine rewrites the AST. First, it examines the different parts of the query AST and processes any aliasing statements (e.g., an expression such as <code>SELECT foo AS bar ...</code> in SQL) or other modifications. The engine rewrites the AST to produce the abstract query. It then records the mappings between entities such as tables and columns in <code>Data</code> objects; this is done for both the inputs and outputs of the query expression. Finally, it rewrites the AST to convert data resource references into abstract resource references. In our example above, this is the step that converts query references like <code>a.datestamp</code> into <code>a.col_0</code>. This is written in the field <code>statement</code> in the <code>Dataset</code> object.</p></li>
<li><p>Next, the engine executes the query, producing the resulting concrete <code>Data</code> .</p></li>
<li><p>The query engine writes the results to IPFS as a <code>Dataset</code> object, writing the <code>Data</code>, <code>Query</code> and <code>Structure</code> hash references into the <code>Dataset</code>, and saving the output <code>Data</code> too.</p></li>
</ol>
<p align="center">
<img width="500pt" src="/graphics/query-processing.svg">
</p>
<h2 id="query-output"><span class="header-section-number">2.5</span> Query output</h2>
<p>The result of a query is another <code>Dataset</code> object and potentially a new <code>Data</code> object referenced by it. This form of <code>Dataset</code> makes use of a few additional fields. The example below illustrates a complete, mostly-dereferenced result (<code>resources.precip</code> dataset and <code>data</code> have been left as references for brevity).</p>
<div class="sourceCode"><pre class="sourceCode json"><code class="sourceCode json"><span class="fu">{</span>
  <span class="dt">&quot;queryString&quot;</span><span class="fu">:</span> <span class="st">&quot;SELECT datestamp, lat, lng, precip_amt FROM precip&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;resources&quot;</span><span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;precip&quot;</span><span class="fu">:</span> <span class="st">&quot;/ipfs/QmaPAxymKpMQDFjneKs8XRvrTWQF4gLbaenBQtB4MmSE46&quot;</span>
  <span class="fu">},</span>
  <span class="dt">&quot;query&quot;</span><span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;statement&quot;</span><span class="fu">:</span> <span class="st">&quot;SELECT a.col_2, a.col_3, a.col_4, a.col_5 FROM a&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;inputStructures&quot;</span><span class="fu">:</span> <span class="fu">{</span>
      <span class="dt">&quot;a&quot;</span><span class="fu">:</span> <span class="fu">{</span>
        <span class="dt">&quot;format&quot;</span><span class="fu">:</span> <span class="st">&quot;text/csv&quot;</span><span class="fu">,</span>
        <span class="dt">&quot;formatConfig&quot;</span><span class="fu">:</span> <span class="fu">{</span> <span class="dt">&quot;headerRow&quot;</span><span class="fu">:</span> <span class="kw">false</span> <span class="fu">},</span>
        <span class="dt">&quot;schema&quot;</span><span class="fu">:</span> <span class="fu">{</span>
          <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span>
            <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_0&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span> <span class="fu">}</span><span class="ot">,</span>
            <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_1&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
            <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_2&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
            <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_3&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;integer&quot;</span> <span class="fu">}</span>
          <span class="ot">]</span>
        <span class="fu">}</span>
      <span class="fu">}</span>
    <span class="fu">},</span>
    <span class="dt">&quot;outputStructure&quot;</span><span class="fu">:</span> <span class="fu">{</span>
      <span class="dt">&quot;format&quot;</span><span class="fu">:</span> <span class="st">&quot;text/csv&quot;</span><span class="fu">,</span>
      <span class="dt">&quot;formatConfig&quot;</span><span class="fu">:</span> <span class="fu">{</span> <span class="dt">&quot;headerRow&quot;</span><span class="fu">:</span> <span class="kw">false</span> <span class="fu">},</span>
      <span class="dt">&quot;schema&quot;</span><span class="fu">:</span> <span class="fu">{</span>
        <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span>
          <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span> <span class="fu">}</span><span class="ot">,</span>
          <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;lat&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
          <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;lng&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
          <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;precip_amt&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;integer&quot;</span> <span class="fu">}</span>
        <span class="ot">]</span>
      <span class="fu">}</span>
    <span class="fu">},</span>
    <span class="dt">&quot;syntax&quot;</span> <span class="fu">:</span> <span class="st">&quot;application/sql&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;qri&quot;</span> <span class="fu">:</span> <span class="st">&quot;1.0&quot;</span><span class="fu">,</span>
  <span class="fu">},</span>
  <span class="dt">&quot;structure&quot;</span><span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;format&quot;</span><span class="fu">:</span> <span class="st">&quot;text/csv&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;formatConfig&quot;</span><span class="fu">:</span> <span class="fu">{</span> <span class="dt">&quot;headerRow&quot;</span><span class="fu">:</span> <span class="kw">false</span> <span class="fu">},</span>
    <span class="dt">&quot;schema&quot;</span><span class="fu">:</span> <span class="fu">{</span>
      <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;lng&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;lat&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;precip_amt&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;integer&quot;</span> <span class="fu">}</span>
      <span class="ot">]</span>
    <span class="fu">}</span>
  <span class="fu">},</span>
  <span class="dt">&quot;abstractStructure&quot;</span><span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;format&quot;</span><span class="fu">:</span> <span class="st">&quot;text/csv&quot;</span><span class="fu">,</span>
    <span class="dt">&quot;formatConfig&quot;</span><span class="fu">:</span> <span class="fu">{</span> <span class="dt">&quot;headerRow&quot;</span><span class="fu">:</span> <span class="kw">false</span> <span class="fu">},</span>
    <span class="dt">&quot;schema&quot;</span><span class="fu">:</span> <span class="fu">{</span>
      <span class="dt">&quot;fields&quot;</span><span class="fu">:</span> <span class="ot">[</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_0&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;datestamp&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_1&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_2&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;float&quot;</span> <span class="fu">}</span><span class="ot">,</span>
        <span class="fu">{</span> <span class="dt">&quot;name&quot;</span><span class="fu">:</span> <span class="st">&quot;col_3&quot;</span><span class="fu">,</span> <span class="dt">&quot;type&quot;</span><span class="fu">:</span> <span class="st">&quot;integer&quot;</span> <span class="fu">}</span>
      <span class="ot">]</span>
    <span class="fu">}</span>
  <span class="fu">}</span>
  <span class="st">&quot;data&quot;</span><span class="er">:</span> <span class="st">&quot;/ipfs/QmQg6LPcPTxrgDmhYpvCZSgDR7KJKjtveyDGp1T4583afp&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;length&quot;</span><span class="fu">:</span> <span class="dv">2341472</span><span class="fu">,</span>
  <span class="dt">&quot;timestamp&quot;</span><span class="fu">:</span> <span class="st">&quot;2017-08-27T13:14:10.479631674-04:00&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;title&quot;</span><span class="fu">:</span> <span class="st">&quot;Normalized Precipitation&quot;</span>
  <span class="er">...</span>
<span class="fu">}</span></code></pre></div>
<p>This brings all of the elements together: the fields for the concrete <code>queryString</code> and the <code>resources</code> it referenced, the <code>query</code> field holding the <code>Query</code> object, and the <code>structure</code> and <code>data</code> that indicate the results of running the query, with a <code>length</code> field to inform readers of the size of the data referenced by <code>data</code>. Note how the original query statement in <code>queryString</code> references a specific table name, <code>&quot;precip&quot;</code>; this is linked to a resource by the corresponding value inside the <code>resources</code> field. Along with structure we have included the full <code>abstractStructure</code> counterpart here as well.</p>
<p>A <code>Dataset</code> contains numerous additional metadata fields that provide context and useful information about the nature of what the query is about. A timestamp and title round out the example above, but other metadata fields exist.</p>
<h2 id="hash-collision-and-discovery"><span class="header-section-number">2.6</span> Hash Collision and Discovery</h2>
<p>So the question stands, why go to all this effort calculating abstract queries and structures? The advantage of using these abstract forms becomes clear when isolated and placed on a content-addressed network. At time of addition, we separate out the abstract structure as independant files and write each to the network, which gives us a concrete hash that we store in <code>Dataset</code> as a reference. For example, here is the above output dataset in its referenced form:</p>
<div class="sourceCode"><pre class="sourceCode json"><code class="sourceCode json"><span class="fu">{</span>
  <span class="dt">&quot;query&quot;</span> <span class="fu">:</span> <span class="st">&quot;/ipfs/QmREmnNphzN2Eq2zqqRUqYzD8GuapgFCD3HyrDtoDt2t6y&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;queryString&quot;</span><span class="fu">:</span> <span class="st">&quot;SELECT datestamp, lat, lng, precip_amt FROM precip&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;resources&quot;</span><span class="fu">:</span> <span class="fu">{</span>
    <span class="dt">&quot;precip&quot;</span><span class="fu">:</span> <span class="st">&quot;/ipfs/QmaPAxymKpMQDFjneKs8XRvrTWQF4gLbaenBQtB4MmSE46&quot;</span>
  <span class="fu">},</span>
  <span class="dt">&quot;structure&quot;</span><span class="fu">:</span> <span class="st">&quot;/ipfs/QmfC8G1Rb2Gnr2oViDVrQ53YWoZWqxixjNiqRUK2EV2bvu&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;abstractStructure&quot;</span> <span class="fu">:</span> <span class="st">&quot;/ipfs/QmVARDRfVh24FoYrzbdbwMQf7zQFdNv7VM15WVUuukSttV&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;data&quot;</span><span class="fu">:</span> <span class="st">&quot;/ipfs/QmQg6LPcPTxrgDmhYpvCZSgDR7KJKjtveyDGp1T4583afp&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;length&quot;</span><span class="fu">:</span> <span class="dv">2341472</span><span class="fu">,</span>
  <span class="dt">&quot;timestamp&quot;</span><span class="fu">:</span> <span class="st">&quot;2017-08-27T13:14:10.479631674-04:00&quot;</span><span class="fu">,</span>
  <span class="dt">&quot;title&quot;</span><span class="fu">:</span> <span class="st">&quot;Normalized Precipitation&quot;</span>
  <span class="er">...</span>
<span class="fu">}</span></code></pre></div>
<p>Instead of storing the abstract structures itself in the dataset, we store the <em>reference to its hash</em>.</p>
<p>Sometime later, we come upon another dataset whose abstract structure is the same. When true, the hash of the abstract structure will <em>collide</em> with the previous hash. Once stored on the network, we can determine that these two datasets are machine-interoperable through simple string comparison of the field references. These datasets may in fact not be directly relatable due to practical differences in data collection methods or other conventions (which will hopefully be annotated in the concrete dataset structure definitions, which will carry a much higher degree of variance), but through this process we gain the crucial knowledge that these two datasets are interoperable at the machine level.</p>
<p align="center">
<img width="500pt" src="/graphics/population-eg-datasets.svg">
</p>
<p>This collision property creates a naturally-occurring traversable graph if data interchangeability. Given any collection of datasets, it is possible to “discover” if any of datasets are interchangeable through comparison of their abstract structures. This represents a step forward in getting data “stacking” to work.</p>
<p>We take this concept one step further by having queries store references to abstract structures, and storing queries themselves as hash-references. If the first dataset is used in a query we know with confidence that we can run the second dataset through the same query.</p>
<p align="center">
<img width="500pt" src="/graphics/population-eg-query.svg">
</p>
<p>In this form, queries become reusable by any dataset whose abstract structures match. Anyone who has written a nontrivial SQL query can attest to the desire to maximize the value of this labour. While this “query reuse” will be nonsensical in many forms, knowing that a query <em>can</em> be reused means that User interfaces can suggest “template” queries that may help reduce repeated work. This form of abstraction also opens up the possibilities of chaining multiple queries together to form data pipelines, flowing new datasets through a cascade of queries, producing a number of resulting datasets.</p>
<h2 id="structure-and-query-analysis"><span class="header-section-number">2.7</span> Structure and Query Analysis</h2>
<p>While this natural interoperability is of great benefit to end users, a second benefit arises over time as the abstract structure and query address space is populated. These abstract forms limit the size of the hash space that will be consumed to a meaningfully small number of permutations. As more dataset and queries are added to the network, we can collect and analyze this address space for additional insights. Enumerating the frequency of occurrence of different types of abstract structures will allow us to build tools that steer datasets toward these naturally arising common-forms, which will add to the collective usefulness of these forms.</p>
<p>We can leverage this abstract interoperability to cut across different subjects of research. Because structures from vastly different areas of research may share the same abstract structure, they are naturally connected by the network. In this form, a number of “false positive” connections will naturally arise, showing the interoperability of seemingly unrelated datasets from dramatically different areas of research. With deterministic querying it is entirely possible that, for example, gorilla population data may hash-collide with data on the population of the city of London. While this may seem nonsensical, we believe this form of toll-free comparability will encourage users to conceive of entirely new uses for data that had gone previously undiscovered. Combined with machine learning (particularly random forest decision trees), it is possible to have a computer chase down any number of these data comparison permutations looking for new insights from hard-earned data and queries.</p>
<h1 id="metadata"><span class="header-section-number">3</span> Metadata</h1>
<p>The description so far has touched only briefly on metadata, but metadata is a fundamental ingredient in all open data applications. Data resources are useless to humans without descriptive metadata. It is commonly understood that without a proper description of the resource, it is impossible to develop meaningful ontological connections with other resources. At the machine level it may be perfectly fine to compare two fields from different <code>Data</code> objects named <code>precip</code> of type <code>float</code>, but clearly there will be a problem if one field is measured in millimeters and the other is measured in inches.</p>
<h2 id="metadata-in-dataset"><span class="header-section-number">3.1</span> Metadata in <code>Dataset</code></h2>
<p>A <code>Dataset</code> is where metadata about data and data operations is stored. It is an express design goal of deterministic querying that it can support, at minimum, first-order metadata formats that are in use today. We also want to build on as many hard-earned lessons as possible from the Collections, Libraries, Archives and Museum communities (CLAM) for archival needs.</p>
<p><code>Dataset</code> acts to hold descriptive metadata, and is intended to be able to hold arbitrary metadata content. Descriptive metadata can and should be <em>author attributed</em>, associating descriptive claims about a resource with a cryptographic keypair which may represent a person, group of people, or software (the specification for author attribution will be covered in a separate document).</p>
<p>The separation of metadata from data files allows metadata to change independently of <code>Data</code>, <code>Query</code> and <code>Structure</code>. Through the use of Linked Data (discussed in the next section), any number of resource definitions can form Directed Acyclic Graphs (DAGs). This encourages <code>Structure</code> and <code>Query</code> to participate in multiple DAG histories. This multiple-history approach allows connection between, say, a principle resource and a “cleaned” variant through descriptive metadata. This also allows queries to participate in the history formation process. Using these techniques it is possible to use querying a tool for transforming data into an alternate form, and writing the query to a DAG in a form that facilitates greater machine-repeatability.</p>
<h2 id="requirements-for-metadata-interoperability"><span class="header-section-number">3.2</span> Requirements for metadata interoperability</h2>
<p>A technical challenge in designing useful support for metadata is that while a <code>Dataset</code> needs to support arbitrary metadata, it must also must place some restrictions on the use of reserved keywords. The approach followed here is influenced by Project Open Data <span class="citation">[Data <a href="#ref-pod2017resources">2017</a>]</span>; in developing this scheme, we compared the metadata fields used in several prominent metadata formats, and selected a subset that can cover the minimum of many formats using a common set of terms whenever possible. We focus in particular on the Data Catalog vocabulary <span class="citation">[W3C <a href="#ref-dcat2014">2014</a>]</span>, CKAN/DKAN <span class="citation">[CKAN Association <a href="#ref-ckan2017">2017</a>]</span>, Schema.org <span class="citation">[Guha et al. <a href="#ref-guha2016schema">2016</a>; Schema.org <a href="#ref-schema_org_2012">2012</a>]</span>, the Open Knowledge Foundation <code>datapackage</code> <span class="citation">[Frictionless Data <a href="#ref-frictionlessdata2017">2017</a>]</span> format, and the DataVerse APIs <span class="citation">[Crosas <a href="#ref-crosas2011dataverse">2011</a>; King <a href="#ref-king2007introduction">2007</a>]</span>. By making use of same-term metadata wherever possible, and placing restrictions on fields that intersect and cover the minimum information across these formats, we leave open the potential to write software libraries that can translate <code>Dataset</code> metadata to/from all of these metadata standards. It is worth noting that any translation to this format will require rewriting content-addressed network hashes to a URL-based system.</p>
<h1 id="integration-with-linked-data-and-linked-open-data"><span class="header-section-number">4</span> Integration with Linked Data and Linked Open Data</h1>
<p>Other schemes for linking distributed datasets exist, particularly in the form of Linked Data <span class="citation">[Heath and Bizer <a href="#ref-heath2011linked">2011</a>]</span>. The conceptual principles of Linked Data are relatively straightforward: data is represented as subject-predicate-object triples expressed in RDF, where everything (entities, predicates, data sources) uses URIs as identifiers, and data is made accessible over HTTP. The standard search mechanism for Linked Data is SPARQL, patterned after SQL. <em>Linked Open Data</em> is simply open data (i.e., data made available under open license terms) made available through Linked Data technologies.</p>
<p>There are similarities between Linked Data and deterministic querying, and it is an explicit design goal to advance natural interoperability. As with Linked Data, the deterministic querying approach is intended to allow the result of any operation on a dataset to be used by any number of outside software tools able to parse widely-adopted formats. The main difference is that it should be possible to traverse all recorded operations without the use of any database technology.</p>
<p>The first step toward realizing the value of this interoperability will be to add support for the InterPlanetary Linked Data specification, IPLD <span class="citation">[Protocol Labs <a href="#ref-ipld2017">2017</a><a href="#ref-ipld2017">b</a>]</span>. IPLD is the linked data complement to IPFS; it allows all hash-linked data structures to be treated using a unified data model analogous to linked data in the Semantic Web sense <span class="citation">[Auer et al. <a href="#ref-auer2014linked">2014</a>; Heath and Bizer <a href="#ref-heath2011linked">2011</a>]</span>. IPLD defines conventions for writing links between objects, such that the link is content-addressed. This allows linked paths to be expressed from one object, through middle objects, to a target object—much like linked data in general.</p>
<h2 id="linking-to-other-distributed-frameworks"><span class="header-section-number">4.1</span> Linking to other distributed frameworks</h2>
<p>Content addressing via hashes is not limited to IPFS: git, Ethereum and other distributed systems also use content addressing via hashes. IPLD is designed in such a way that it can work with other hash-based content addressing systems. Thus, IPLD provides a neutral, uniform way to address and link entities across different hash-based distributed systems—IPFS, git, Ethereum, and others.</p>
<p>This opens up additional potential for a deterministic querying processor. Through use of an IPLD <em>adapter</em>, it is possible to coordinate query results with other linked data structures like blockchain-based cryptocurrencies or git version histories. This data-format bridging opens up possibilities for connecting deterministic querying to other kinds of resources. For example, it should be possible to take advantage of Ethereum to create smart contracts for procuring data and fulfilling processing and analysis tasks. To take another example, an IPLD adapter could connect formal data schemas and test data with source code to process that data, referencing specific versions of source code stored using git.</p>
<h1 id="storage-efficiency"><span class="header-section-number">5</span> Storage efficiency</h1>
<p>A natural concern about the scheme described so far is the question of disk space usage. If every unique data file is saved to IPFS as a separate entity, it may seem that a storage explosion would be unavoidable over the course of using a scheme such as deterministic querying (or indeed IPFS in general). How can this be mitigated?</p>
<h2 id="leveraging-the-properties-of-ipfs"><span class="header-section-number">5.1</span> Leveraging the properties of IPFS</h2>
<p>IPFS partially solves this problem for us. An IPFS file store is actually a content-addressed store of file blocks—files are broken into a set of fixed-size blocks that are each content-addressed by hashes. A file is in reality a collection of references to hashed blocks:</p>
<p align="center">
<img width="500pt" src="/graphics/merkle.svg">
</p>
<p>Crucially, file blocks <em>can be shared</em>: after all, if two content blocks hash to the same hash value, their content is identical, which means a given IPFS file store can simply point to the common blocks instead of storing separate copies. Moreover, as with everything else in IPFS, the hashes are unique across the entire IPFS address space, and so file blocks—parts of files—can be spread across the network.</p>
<p>This can be leveraged further in a deterministic querying system. In particular, we can take advantage of this feature to avoid duplication of data between slightly-altered files. Two files that have a similar-enough composition will be automatically deduplicated upon addition through hash collision. In a simplified example, adding data to the end of a raw file will result in only a one-block addition, instead of fully duplicating the entire file. This is yet another benefit of using content addressing and the underlying IPFS technology.</p>
<p align="center">
<img width="250pt" src="/graphics/deduplicating.svg">
</p>
<h2 id="implementing-efficient-file-decomposition-strategies"><span class="header-section-number">5.2</span> Implementing efficient file decomposition strategies</h2>
<p>An implementation of deterministic querying can be smarter about file storage, and additional steps can be taken to improve the rate of deduplication. Using IPLD adapters for common file formats, CSV, JSON, and other files stored with “rows” of entries can be broken into blocks along breaks between rows. By breaking down these blocks into logical parts, we increase the chance of deduplication between files. This can achieve much smaller storage overhead for similar dataset data.</p>
<p>Coupled with the fact that operations on data will be row-oriented. This further opens up possibilities for streaming blocks and distributed computation, given that they will be stored as valid sets of one or more rows.</p>
<h1 id="properties-of-deterministic-querying"><span class="header-section-number">6</span> Properties of deterministic querying</h1>
<p>The combination of IPFS and the machinery described above gives us the following. First, raw data in a file is <em>permanently</em>, <em>uniquely</em> identified by a cryptographic hash: given such a hash, we can retrieve the corresponding <code>Data</code> object from IPFS and we can be sure that what we get is the dataset that was stored at that hash. Second, describe the format of a raw data file using a reusable <code>Structure</code> object that provides information about the shape and other characteristics of the data. Like the data itself, the definition is hashed to IPFS, giving it a permanent, unique identifier. Third, a connection between a given <code>Structure</code> and a <code>Data</code> object, along with associated metadata, is stored in a <code>Dataset</code> object that uses the unique hashes to identify the data and the structure definition unambiguously. Finally, data queries and transformations are expressed in a canonical form using a reusable <code>Query</code> object that is defined in terms of <code>Structure</code> rather than specific datasets, thus making it reusable—and this, too, is hashed to IPFS.</p>
<p>With this in place, we also have <em>deterministic results</em>. Upon successfully executing a query, we can write the query and its resulting data to the network; the results will be one or more <code>Data</code> object, described by one or more <code>Structure</code> object. The results are deterministic because <em>any software using the same data, structure definition, and query definition, will obtain the same results</em>, regardless of where, when or why it is done.</p>
<p>This leads to several useful properties, described below.</p>
<h2 id="discoverability"><span class="header-section-number">6.1</span> Discoverability</h2>
<p>The fact that the results of a query follow a consistent protocol and are written permanently to IPFS means that if the results of a query have already been computed and stored, other software systems can discover the results <em>before</em> they attempt to compute them. What’s more, since the results are described using lightweight <code>Structure</code> and <code>Dataset</code> objects, users can make these discoveries without downloading potentially large datasets. Thus, before executing a query, a software tool can calculate the hash of the <code>Query</code> and check IPFS for the existence of that hash value. If it exists, the results may be loaded from the network instead of being recomputed. There will be situations where local computation is easier than network streaming, and analyzing when to make this tradeoff is an area of research we’re excited to investigate.</p>
<h2 id="immutability-and-defensibility"><span class="header-section-number">6.2</span> Immutability and defensibility</h2>
<p>In many data use scenarios, it is important to know that a given dataset has not been altered. This is often difficult to ensure. For example, a URL may refer to a dataset on the web, and the resource holding that dataset may claim that it is the original data stored in that file at that URL—but it could have been corrupted or purposefully altered, and for most of the popular data formats in use today, it would be difficult for the recipient to discover this.</p>
<p>The use of a cryptographic hashes to identify data virtually eliminates this possibility. If you publish the hash of a given dataset in IPFS, it is permanent: if you obtain the dataset that someone claims is the corresponding data for the hash you give them, you can compute hash of the given data file yourself and verify that it has not been altered. Moreover, in the deterministic querying scheme, this immutability applies not only to the data, but to <em>the entire chain of processes that produce results</em> from one set of <code>Data</code> objects to others.</p>
<p>Do you want to claim that a certain series of data manipulation and calculations produces a certain result? With deterministic querying, you can prove it incontrovertibly.</p>
<h2 id="software-independence"><span class="header-section-number">6.3</span> Software independence</h2>
<p>By forcing the database to output to a standard format, the software version (even the entire application) that operates on a dataset can change at any point in the history of changes to a dataset. The software implementation does not matter, as long as it works according to the procedures described here, and reads and writes data and queries in the standard format defined by deterministic querying. This makes it possible to swap out different tools in the chain of operations, whether to take advantage of implementation improvements (perhaps because more efficient software is developed) or to optimize other characteristics. It also provides future-proofing: the results of using a tool can persist long after the usefulness of the tool itself has expired.</p>
<h1 id="conclusion"><span class="header-section-number">7</span> Conclusion</h1>
<p>Building open data systems that can behave more like open-source code systems requires rethinking some assumptions. New content-addressed distributed networks being introduced today present an opportunity to question the assumptions that underlie a large number of today’s databased-backed open data systems. The goal of deterministic querying is to replace a set of common architectural patterns in use today with a more efficient and beneficial pattern that can take advantage of content-addressed file systems such as IPFS. If successful, we believe this can form the basis of an open data commons that naturally increases its capacity through use, for the benefit of all who use it, while still providing room for an evolving ecosystem of tools.</p>
<p>The intent of deterministic querying is not to eliminate database technologies in all situations. Rather, the goal is to reduce the need for large numbers of users to recreate identical accesses and encode/decode steps on the same data. Assuming that most data continue to be held in databases, database accesses will still be needed for novel queries; the gains in reduced computation and network accesses will be realized when multiple distributed users or processes repeat the same queries. The reality today is that queries to content-addressed networks are likely to be slower than queries to local databases, but those losses are expected to be offset by deduplication of data as well as resource use reduction in the aggregate. This form of deterministic querying deliberately accepts a number of performance tradeoffs for the sake of repeatability and interoperability.</p>
<p>The approach described here will be best suited to certain use cases. The efficacy of this technique is inversely correlated to how frequently the underlying data changes; data that is not mutated after initial insertion is ideal for this approach. Thankfully, many datasets fall into this category, including scientific research data, government data, industrial data, and more. We contend that the development of deterministic querying offers a way to build an open data commons to provide greater opportunity for the collective, accumulative advancement of open data.</p>
<!--

Deterministic querying promises new capabilities and powers, but it is in its early stages of development; IPFS itself is also still young.  There will surely be more challenges ahead, but 

-->
<!-- Refs are added automatically by Pandoc after this next section -->
<h1 id="references" class="unnumbered">References</h1>
<div id="refs" class="references">
<div id="ref-auer2014linked">
<p><span style="font-variant: small-caps;">Auer, S., Bryl, V., and Tramp, S.</span> 2014. <em>Linked open data–Creating knowledge out of interlinked data: Results of the lOD2 project</em>. Springer. <a href="https://doi.org/10.1007/978-3-319-09846-3" class="uri">https://doi.org/10.1007/978-3-319-09846-3</a>.</p>
</div>
<div id="ref-aurora2007code">
<p><span style="font-variant: small-caps;">Aurora, V.</span> 2007. The code monkey’s guide to cryptographic hashes for content-based addressing. <em>LinuxWorld</em>.</p>
</div>
<div id="ref-baack2015datafication">
<p><span style="font-variant: small-caps;">Baack, S.</span> 2015. Datafication and empowerment: How the open data movement re-articulates notions of democracy, participation, and journalism. <em>Big Data &amp; Society</em> <em>2</em>, 2. <a href="https://doi.org/10.1177/2053951715594634" class="uri">https://doi.org/10.1177/2053951715594634</a>.</p>
</div>
<div id="ref-baumgart2007s">
<p><span style="font-variant: small-caps;">Baumgart, I. and Mies, S.</span> 2007. S/Kademlia: A practicable approach towards secure key-based routing. <em>International conference on parallel and distributed systems</em>, 1–8.</p>
</div>
<div id="ref-benet2014ipfs">
<p><span style="font-variant: small-caps;">Benet, J.</span> 2014. IPFS – content addressed, versioned, P2P file system. <em>Computing Resources Repository</em> <em>arXiv:1407.3561</em>.</p>
</div>
<div id="ref-bergquist2001power">
<p><span style="font-variant: small-caps;">Bergquist, M. and Ljungberg, J.</span> 2001. The power of gifts: Organizing social relationships in open source communities. <em>Information Systems Journal</em> <em>11</em>, 4, 305–320. <a href="https://doi.org/10.1046/j.1365-2575.2001.00111.x" class="uri">https://doi.org/10.1046/j.1365-2575.2001.00111.x</a>.</p>
</div>
<div id="ref-vandenbosch2016estimating">
<p><span style="font-variant: small-caps;">Bosch, A. van den, Bogers, T., and Kunder, M. de</span>. 2016. Estimating search engine index size variability: A 9-year longitudinal study. <em>Scientometrics</em> <em>107</em>, 839–856. <a href="https://doi.org/10.1007/s11192-016-1863-z" class="uri">https://doi.org/10.1007/s11192-016-1863-z</a>.</p>
</div>
<div id="ref-chamberlin2009sql">
<p><span style="font-variant: small-caps;">Chamberlin, D.</span> 2009. SQL. In: <em>Encyclopedia of database systems</em>. Springer, 2753–2760. <a href="https://doi.org/10.1007/978-0-387-39940-9_1091" class="uri">https://doi.org/10.1007/978-0-387-39940-9_1091</a>.</p>
</div>
<div id="ref-cisco2017zettabyte">
<p><span style="font-variant: small-caps;">Cisco</span>. 2017. <em>The zettabyte era: Trends and analysis</em>. Available on the World Wide Web at <a href="https://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/vni-hyperconnectivity-wp.html" class="uri">https://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/vni-hyperconnectivity-wp.html</a>.</p>
</div>
<div id="ref-ckan2017">
<p><span style="font-variant: small-caps;">CKAN Association</span>. 2017. <em>CKAN</em>. Available on the World Wide Web at <a href="https://ckan.org" class="uri">https://ckan.org</a>.</p>
</div>
<div id="ref-crosas2011dataverse">
<p><span style="font-variant: small-caps;">Crosas, M.</span> 2011. The dataverse network: An open-source application for sharing, discovering and preserving data. <em>D-Lib Magazine</em> <em>17</em>, 1/2. <a href="https://doi.org/10.1045/january2011-crosas" class="uri">https://doi.org/10.1045/january2011-crosas</a>.</p>
</div>
<div id="ref-crowston2008free">
<p><span style="font-variant: small-caps;">Crowston, K., Wei, K., Howison, J., and Wiggins, A.</span> 2008. Free/Libre open-source software development: What we know and what we do not know. <em>ACM Comput. Surv.</em> <em>44</em>, 2, 7:1–7:35. <a href="https://doi.org/10.1145/2089125.2089127" class="uri">https://doi.org/10.1145/2089125.2089127</a>.</p>
</div>
<div id="ref-pod2017resources">
<p><span style="font-variant: small-caps;">Data, P.O.</span> 2017. <em>Metadata resources for schema v1.1</em>. Available on the World Wide Web at <a href="https://project-open-data.cio.gov/v1.1/metadata-resources/" class="uri">https://project-open-data.cio.gov/v1.1/metadata-resources/</a>.</p>
</div>
<div id="ref-elghandour2012restore">
<p><span style="font-variant: small-caps;">Elghandour, I. and Aboulnaga, A.</span> 2012. ReStore: Reusing results of mapReduce jobs. <em>Proceedings of the VLDB Endowment</em> <em>5</em>, 6, 586–597. <a href="https://doi.org/10.14778/2168651.2168659" class="uri">https://doi.org/10.14778/2168651.2168659</a>.</p>
</div>
<div id="ref-ferguson2014big">
<p><span style="font-variant: small-caps;">Ferguson, A.R., Nielson, J.L., Cragin, M.H., Bandrowski, A.E., and Martone, M.E.</span> 2014. Big data from small data: Data-sharing in the ’long tail’ of neuroscience. <em>Nature Neuroscience</em> <em>17</em>, 11, 1442–1447. <a href="https://doi.org/10.1038/nn.3838" class="uri">https://doi.org/10.1038/nn.3838</a>.</p>
</div>
<div id="ref-freed2013media">
<p><span style="font-variant: small-caps;">Freed, N., Klensin, J., and Hansen, T.</span> 2013. <em>Media type specifications and registration procedures</em>. Available on the World Wide Web at <a href="https://tools.ietf.org/html/rfc6838" class="uri">https://tools.ietf.org/html/rfc6838</a>; Internet Engineering Task Force (IETF).</p>
</div>
<div id="ref-freedman2004democratizing">
<p><span style="font-variant: small-caps;">Freedman, M.J., Freudenthal, E., and Mazières, D.</span> 2004. Democratizing content publication with Coral. <em>Proceedings of the 1st conference on symposium on networked systems design and implementation</em>, USENIX Association, 18–18.</p>
</div>
<div id="ref-frictionlessdata2017">
<p><span style="font-variant: small-caps;">Frictionless Data</span>. 2017. <em>Data packages</em>. Available on the World Wide Web at <a href="http://frictionlessdata.io/data-packages/" class="uri">http://frictionlessdata.io/data-packages/</a>.</p>
</div>
<div id="ref-vonGagern2017base58">
<p><span style="font-variant: small-caps;">Gagern, M. von, Roose, S., Cary, D., Danford, J., and Dingley, A.</span> 2017. <em>Base58</em>. Available on the World Wide Web at <a href="https://en.wikipedia.org/wiki/Base58" class="uri">https://en.wikipedia.org/wiki/Base58</a>; Wikipedia.</p>
</div>
<div id="ref-Garcia2016-gv">
<p><span style="font-variant: small-caps;">García, S., Ramírez-Gallego, S., Luengo, J., Benítez, J.M., and Herrera, F.</span> 2016. Big data preprocessing: Methods and prospects. <em>Big Data Analytics</em> <em>1</em>, 1, 9. <a href="https://doi.org/10.1186/s41044-016-0014-0" class="uri">https://doi.org/10.1186/s41044-016-0014-0</a>.</p>
</div>
<div id="ref-gewin2016data">
<p><span style="font-variant: small-caps;">Gewin, V.</span> 2016. Data sharing: An open mind on open data. <em>Nature</em> <em>529</em>, 7584, 117–119. <a href="https://doi.org/10.1038/nj7584-117a" class="uri">https://doi.org/10.1038/nj7584-117a</a>.</p>
</div>
<div id="ref-guha2016schema">
<p><span style="font-variant: small-caps;">Guha, R.V., Brickley, D., and Macbeth, S.</span> 2016. Schema.org: Evolution of structured data on the web. <em>Communications of the ACM</em> <em>59</em>, 2, 44–51. <a href="https://doi.org/10.1145/2857274.2857276" class="uri">https://doi.org/10.1145/2857274.2857276</a>.</p>
</div>
<div id="ref-haefliger2008code">
<p><span style="font-variant: small-caps;">Haefliger, S., Krogh, G. von, and Spaeth, S.</span> 2008. Code reuse in open source software. <em>Management Science</em> <em>54</em>, 1, 180–193. <a href="https://doi.org/10.1287/mnsc.1070.0748" class="uri">https://doi.org/10.1287/mnsc.1070.0748</a>.</p>
</div>
<div id="ref-heath2011linked">
<p><span style="font-variant: small-caps;">Heath, T. and Bizer, C.</span> 2011. <em>Linked data: Evolving the web into a global data space</em>. Morgan &amp; Claypool.</p>
</div>
<div id="ref-iso2016sql">
<p><span style="font-variant: small-caps;"><span>ISO</span>/IEC JTC 1/SC 32</span>. 2016. <em>Information technology — database languages — SQL — part 1: Framework (SQL/Framework)</em>. International Organization for Standardization.</p>
</div>
<div id="ref-kansakar2016review">
<p><span style="font-variant: small-caps;">Kansakar, P. and Hossain, F.</span> 2016. A review of applications of satellite earth observation data for global societal benefit and stewardship of planet earth. <em>Space Policy</em> <em>36</em>, 46–54. <a href="https://doi.org/10.1016/j.spacepol.2016.05.005" class="uri">https://doi.org/10.1016/j.spacepol.2016.05.005</a>.</p>
</div>
<div id="ref-king2007introduction">
<p><span style="font-variant: small-caps;">King, G.</span> 2007. An introduction to the dataverse network as an infrastructure for data sharing. <em>Sociological Methods &amp; Research</em> <em>36</em>, 2, 173–199.</p>
</div>
<div id="ref-klimek2016linkedpipes">
<p><span style="font-variant: small-caps;">Klímek, J., Helmich, J., and Nečaský, M.</span> 2016. LinkedPipes visualization: Simple useful linked data visualization use cases. <em>International semantic web conference</em>, 112–117. <a href="https://doi.org/10.1007/978-3-319-47602-5_23" class="uri">https://doi.org/10.1007/978-3-319-47602-5_23</a>.</p>
</div>
<div id="ref-Lohr2014-aq">
<p><span style="font-variant: small-caps;">Lohr, S.</span> 2014. For Big-Data scientists, “janitor work” is key hurdle to insights. <em>The New York Times</em>. <a href="https://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html" class="uri">https://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html</a>.</p>
</div>
<div id="ref-lowndes2017our">
<p><span style="font-variant: small-caps;">Lowndes, J.S.S., Best, B.D., Scarborough, C., Afflerbach, J.C., Frazier, M.R., OHara, C.C., Jiang, N., and Halpern, B.S.</span> 2017. Our path to better science in less time using open data science tools. <em>Nature Ecology &amp; Evolution</em> <em>1</em>, 6, s41559–017–0160. <a href="https://doi.org/doi:10.1038/s41559-017-0160" class="uri">https://doi.org/doi:10.1038/s41559-017-0160</a>.</p>
</div>
<div id="ref-maali2012publishing">
<p><span style="font-variant: small-caps;">Maali, F., Cyganiak, R., and Peristeras, V.</span> 2012. A publishing pipeline for linked government data. <em>The semantic web: Research and applications</em>, 778–792. <a href="https://doi.org/10.1007/978-3-642-30284-8_59" class="uri">https://doi.org/10.1007/978-3-642-30284-8_59</a>.</p>
</div>
<div id="ref-madan2017advances">
<p><span style="font-variant: small-caps;">Madan, C.R.</span> 2017. Advances in studying brain morphology: The benefits of open-access data. <em>PeerJ Preprints</em>. <a href="https://doi.org/10.7287/peerj.preprints.3010v2" class="uri">https://doi.org/10.7287/peerj.preprints.3010v2</a>.</p>
</div>
<div id="ref-martin2017opening">
<p><span style="font-variant: small-caps;">Martin, E.G. and Begany, G.M.</span> 2017. Opening government health data to the public: Benefits, challenges, and lessons learned from early innovators. <em>Journal of the American Medical Informatics Association</em> <em>24</em>, 2, 345–351. <a href="https://doi.org/10.1093/jamia/ocw076" class="uri">https://doi.org/10.1093/jamia/ocw076</a>.</p>
</div>
<div id="ref-maymounkov2002kademlia">
<p><span style="font-variant: small-caps;">Maymounkov, P. and Mazieres, D.</span> 2002. Kademlia: A peer-to-peer information system based on the XOR metric. <em>International workshop on peer-to-peer systems</em>, Available on the World Wide Web at <a href="https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf" class="uri">https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf</a>, 53–65.</p>
</div>
<div id="ref-mckiernan2016open">
<p><span style="font-variant: small-caps;">McKiernan, E.C., Bourne, P.E., Brown, C.T., Buck, S., Kenall, A., Lin, J., McDougall, D., Nosek, B.A., Ram, K., and Soderberg, C.K.</span> 2016. How open science helps researchers succeed. <em>eLife</em> <em>5</em>. <a href="https://doi.org/10.7554/eLife.16800" class="uri">https://doi.org/10.7554/eLife.16800</a>.</p>
</div>
<div id="ref-miguel2014promoting">
<p><span style="font-variant: small-caps;">Miguel, E., Camerer, C., Casey, K., Cohen, J., Esterling, K.M., Gerber, A., Glennerster, R., Green, D.P., Humphreys, M., and Imbens, G.</span> 2014. Promoting transparency in social science research. <em>Science</em> <em>343</em>, 6166, 30–31. <a href="https://doi.org/10.1126/science.1245317" class="uri">https://doi.org/10.1126/science.1245317</a>.</p>
</div>
<div id="ref-muir2016real">
<p><span style="font-variant: small-caps;">Muir, P., Li, S., Lou, S., Wang, D., Spakowicz, D.J., Salichos, L., Zhang, J., Weinstock, G.M., Isaacs, F., Rozowsky, J., and Gerstein, M.</span> 2016. The real cost of sequencing: Scaling computation to keep pace with data generation. <em>Genome Biology</em> <em>17</em>, 53. <a href="https://doi.org/10.1186/s13059-016-0917-0" class="uri">https://doi.org/10.1186/s13059-016-0917-0</a>.</p>
</div>
<div id="ref-murray2008open">
<p><span style="font-variant: small-caps;">Murray-Rust, P.</span> 2008. Open data in science. <em>Serials Review</em> <em>34</em>, 1, 52–64. <a href="https://doi.org/10.1080/00987913.2008.10765152" class="uri">https://doi.org/10.1080/00987913.2008.10765152</a>.</p>
</div>
<div id="ref-muthitacharoen2001low">
<p><span style="font-variant: small-caps;">Muthitacharoen, A., Chen, B., and Mazieres, D.</span> 2001. A low-bandwidth network file system. <em>Proceedings of the 18th symposium on operating systems principles</em>, Available on the World Wide Web at <a href="http://www.sosp.org/2001/papers/mazieres.pdf" class="uri">http://www.sosp.org/2001/papers/mazieres.pdf</a>, 174–187.</p>
</div>
<div id="ref-pesce2015setting">
<p><span style="font-variant: small-caps;">Pesce, V., Maru, A., Archer, P., Malapela, T., and Keizer, J.</span> 2015. Setting up a global linked data catalog of datasets for agriculture. <em>Research conference on metadata and semantics research</em>, 357–368. <a href="https://doi.org/10.1007/978-3-319-24129-6_31" class="uri">https://doi.org/10.1007/978-3-319-24129-6_31</a>.</p>
</div>
<div id="ref-piwowar2013data">
<p><span style="font-variant: small-caps;">Piwowar, H.A. and Vision, T.J.</span> 2013. Data reuse and the open data citation advantage. <em>PeerJ</em> <em>1</em>, e175. <a href="https://doi.org/10.7717/peerj.175" class="uri">https://doi.org/10.7717/peerj.175</a>.</p>
</div>
<div id="ref-ipfs2017">
<p><span style="font-variant: small-caps;">Protocol Labs</span>. 2017a. IPFS home page. <a href="https://ipfs.io" class="uri">https://ipfs.io</a>.</p>
</div>
<div id="ref-ipld2017">
<p><span style="font-variant: small-caps;">Protocol Labs</span>. 2017b. IPLD home page. <a href="https://ipld.io" class="uri">https://ipld.io</a>.</p>
</div>
<div id="ref-Rogers2013-hx">
<p><span style="font-variant: small-caps;">Rogers, S.</span> 2013. <em>Facts are sacred: The power of data</em>. Faber &amp; Faber.</p>
</div>
<div id="ref-sanderson2012history">
<p><span style="font-variant: small-caps;">Sanderson, M. and Croft, W.B.</span> 2012. The history of information retrieval research. <em>Proceedings of the IEEE</em> <em>100</em>, 1444–1451. <a href="https://doi.org/10.1109/jproc.2012.2189916" class="uri">https://doi.org/10.1109/jproc.2012.2189916</a>.</p>
</div>
<div id="ref-schema_org_2012">
<p><span style="font-variant: small-caps;">Schema.org</span>. 2012. <em>Schema.org</em>. Available on the World Wide Web at <a href="http://schema.org/" class="uri">http://schema.org/</a>.</p>
</div>
<div id="ref-shafranovich2005common">
<p><span style="font-variant: small-caps;">Shafranovich, Y.</span> 2005. <em>Common format and MIME type for comma-separated values (CSV) files</em>. Available on the World Wide Web at <a href="https://tools.ietf.org/html/rfc4180" class="uri">https://tools.ietf.org/html/rfc4180</a>; IETF.</p>
</div>
<div id="ref-shafranovich2013application">
<p><span style="font-variant: small-caps;">Shafranovich, Y.</span> 2013. <em>The application/sql media type</em>. Available on the World Wide Web at <a href="https://tools.ietf.org/rfc/rfc6922.txt" class="uri">https://tools.ietf.org/rfc/rfc6922.txt</a>; Internet Engineering Task Force (IETF).</p>
</div>
<div id="ref-sojer2010code">
<p><span style="font-variant: small-caps;">Sojer, M. and Henkel, J.</span> 2010. Code reuse in open source software development: Quantitative evidence, drivers, and impediments. <em>Journal of the Association for Information Systems</em> <em>11</em>, 12, 868–901.</p>
</div>
<div id="ref-tolia2003opportunistic">
<p><span style="font-variant: small-caps;">Tolia, N., Kozuch, M., Satyanarayanan, M., Karp, B., Bressoud, T., and Perrig, A.</span> 2003. Opportunistic use of content addressable storage for distributed file systems. <em>USENIX annual technical conference, general track</em>, Available on the World Wide Web at <a href="https://www.usenix.org/legacy/publications/library/proceedings/usenix03/tech/full_papers/tolia/tolia_html/usenix03.html" class="uri">https://www.usenix.org/legacy/publications/library/proceedings/usenix03/tech/full_papers/tolia/tolia_html/usenix03.html</a>, 127–140.</p>
</div>
<div id="ref-uhlir2007open">
<p><span style="font-variant: small-caps;">Uhlir, P.F. and Schröder, P.</span> 2007. Open data for global science. <em>Data Science Journal</em> <em>6</em>, OD36–OD53. <a href="https://doi.org/10.2481/dsj.6.OD36" class="uri">https://doi.org/10.2481/dsj.6.OD36</a>.</p>
</div>
<div id="ref-dcat2014">
<p><span style="font-variant: small-caps;">W3C</span>. 2014. Data catalog vocabulary. <a href="https://www.w3.org/TR/vocab-dcat/" class="uri">https://www.w3.org/TR/vocab-dcat/</a>.</p>
</div>
<div id="ref-west2014open">
<p><span style="font-variant: small-caps;">West, J., Salter, A., Vanhaverbeke, W., and Chesbrough, H.</span> 2014. Open innovation: The next decade. <em>Research Policy</em> <em>43</em>, 5, 805–811. <a href="https://doi.org/10.1016/j.respol.2014.03.001" class="uri">https://doi.org/10.1016/j.respol.2014.03.001</a>.</p>
</div>
</div>
</article>
</body>
