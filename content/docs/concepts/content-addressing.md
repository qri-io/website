---
title: "content-addressing"
date: 2018-01-30T00:00:00-04:00
section: concepts
---

# Content Addressing

An address is a uniform, shorthand way of referring to things. Geographic addresses are an obvious example. 1600 Pennsylvania Ave. is the address of the White House. 268 Elizabeth St. is the address of my childhood home. These houses are different in size and function, but they are both locations with addresses that adhere to a (relatively) consistent system. Addresses make it easier to refer to places.

The internet today is location addressed. Youtube.com and Boingboing.net are locations. We refer to content like a video or a blog by its *universal resource locator* (URL). Much like my childhood house, the internet is organized around the location of content. 

Location addressing works well for many purposes, but it’s a poor system for linked data for two important reasons: link rot and content drift. A rotten link is a location on the internet that has become permanently unavailable, the classic “404, not found” you see all the time. Link rot is [pervasive](http://ssnat.com/) on the internet, and in the context of data it’s deeply problematic, as it amounts to a missing dependency.

Content drift is arguably the more insidious problem. It’s completely possible that by now someone has demolished my childhood home and replaced it with a different house. In this case the address is the same, but the content has *drifted*, taking on a different meaning since I last visited. In the data context, the cognitive and procedural overhead of confirming that data exists *and hasn’t changed* dissuades us from taking on the challenge in the first place.

**These problems have balkanized the open data landscape.** Because it’s not possible to build a sufficient reliable system that spans across locations and services, data providers have very little incentive to depend on each other.

So, what’s the alternative? 

Location addressing is so ingrained in our understanding that it may take a bit of “unlearning” to recognize that other, alternative addressing systems exist.  One alternative system for books could be by title. Books have a title, author, publisher, and an ISBN number. The title of a book is a meaningful reference of what’s inside it. *The Cat in The Hat* is indeed a book about a cat, wearing a hat. Because of this, we can say books are *content addressed*. Content addressing is referring to something by *what* it is instead of *where* it is.

It seems silly to ask for the Universal location of a book because any copy of the book will suffice. The location is irrelevant, so long as the content behind an address is the same. If I ask someone for their copy of *The Cat in the Hat* and they hand me a copy *Pride and Prejudice*, I would immediately know they have the wrong address.

**The distributed web is built on content addressing.** In practice this means referring to content by its *hash.* A hash is the output of running content through an algorithm that creates a fixed-length “fingerprint” of the content. The algorithm is a fixed procedure that connects content to this fingerprint, and changing *anything* *(a pixel shade, a punctuation mark, a decimal point)* in the content will change the resulting hash. Because the algorithm is a fixed open procedure, hashes can be independently verified.

Switching from location addressing to content addressing has a *decentralizing* effect. Being freed from concerns of location every “download*”* of a dataset can be used to make that dataset available, fighting link rot.  What’s more, content drift on the distributed web is simply not possible, because content cannot be changed without changing the address.  And that’s just the beginning. 

Content addressing facilitates *shared dependencies*. Because 1) someone can share with me an exact, authoritative copy of their dataset, and 2) she cannot change the data without me knowing, I can depend on it. As soon as I can depend on someone else’s data, that’s one less dataset I have to create myself. I am now free to use that time to create or update other data that someone else may be able to use, simultaneously preserving resources and growing knowledge. 