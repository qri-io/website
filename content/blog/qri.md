---
title: "Qri"
date: 2017-07-24T23:00:29-04:00
draft: false
---

# QRI

Qri (pronounced "query") is built around reducing the barriers to data. I believe the various approaches to working with data will benefit from an alternative view that aims to equally address all barriers to data access, instead of prioritizing one over the other.

Before starting, it's worth noting that when I mention of "data", I'm actually referring to *structured data*. Almost all digital information has at least some degree of structure. Structure ranges from being a stream of random, unidentifiable binary, all the way up to a database that dictates exactly what data it can contain. At a general level I'm only talkinb about the structured half of this spectrum, data that could at bare minimum be shown on an excel spreadsheet. There are some exceptions to this, but it's a good starting point.

## Data Barriers:
A Barrier to data can come in many forms, but for the sake of analysis they can be generalized into four categories:

1. Availability (Data that is hard to find, or access to data is limited)
2. Connectivity (Data that stored in conflicting formats, or not connected to other needed data)
3. Legibility (Data that isn't documented properly, isn't presented in a clear way, or contains formatting errors)
4. Authenticity (Data that cannot be trusted, contains false or unverifiable information)

Our current tools do very little to accomodate these issues because the areas of expertise cross technical, business, and social boundaries, obscuring the financial incentives for doing so. It's easier to see how these barriers arise, as using groups emphasize each problem to the exclusion of the others:

#### Software Engineers & Companies: High-Availability
A Software engineer is concerned with access to data being *fast*, to the exclusion of almost all other properties. A slow database is useless. An inefficent database is uesless. This has lead much of the R&D in database technology to ignore the other barriers.

To solve the deprioritized, connectivity problem, many companies rich with engineering talent will release an API, which seems like it assists the connectivity problem. Unfortunately this leads to the problem of having to constantly write integrations between these API's, which instantly eliminates connectivity beyond a 1-to-1, broker-to-consumer relationship.

#### Academics & NGO's: High-Legibility
Academics & NGO's that advocate for Open Data are primarily concerned with availability & legibility. A scientist working working with data needs to know without doubt what a piece of data is, how it was collected, and how it can be compared to other data. Undocumented data is useless to a scientist. Academics are also

To a NGO, success is defined as publishing data in static files, and then generating reports form those files. A static file is highly legible, and hosting it on an official domain will help it's authenticity, but once that file is downloaded, the authenticity becomes harder to maintain.

#### Governments: High-Authenticity
Governments have the highest degree of authenticity when it comes to data. Census data is a perfect example, and there are many others. Governments, however, suffer under the weight of their own authenticity standards. Changes to official policies can reduce legibility by imposing constraints on the way data is collected & reported.

#### Search Engines: High-Connectivity
Search Engines are the single greatest resource for connecting people to information the world has ever seen. They accomplish this by ignoring the other three barriers. A search engine cannot compare two web pages, because it makes no requirements about the *structure* of the data it's presenting. It can only match a search phrase with results that contain derivatives of that phrase.

At this point it's natural to ask the question "won't machine learning eliminate all of these barriers automatically?". The short answer is, "well, maybe". What I can say for sure is this: Machine learning is developed by feeding massive amounts of structured data to training models. This project will make massive amounts of structured data available.

## A New Approach:
I believe value can be derived from re-approaching the question of data with all of these barriers in mind. The challenge of this approach is it requires a bit of reinventing the wheel. The challenge is to design a product that is equal parts Available, Legible, Verifiable, Connected. From each category I want to sacrifice the qualities that over-prioritization gives in order to make general gains.


#### Availability
By accepting slowdowns, it's possible dramatically increase the number of formats & sources the database can work with. By building a database that can operate on *many* kinds of structured data, availability goes down, but connectivity goes up *without sacrificing structure*.


### Business Applications:

At it's core, this project is a concerted effort to address this problem:
##### People who work with data spend more time *munging* than they do *analyzing*

Finding, acquiring, cleaning, organizing and validating data is not fun. There are lots of databases out there that'll make short work of billion-row datasets. Those are pretty useless if they have the wrong data, or aren't accessible, or refuse to talk with external data.