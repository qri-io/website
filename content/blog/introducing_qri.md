---
title: "Introducing Qri"
date: 2019-02-15T15:00:00-04:00
draft: false
tags:
- DataRescue
author:
  given_name: Brendan
  family_name: O'Brien
  display_name: b5
description: Some background on how Qri got its start and what we hope to achieve 
---

I’m delighted to introduce a project a few others and I have been working on for the last few years. It's called Qri (pronounced "query". I know, I’m sorry). Qri is about data. Instead of telling you about software, I’d like to start by telling you the story behind why Qri exists. 

Two-ish years ago I came across an [article](https://www.washingtonpost.com/news/energy-environment/wp/2016/12/13/scientists-are-frantically-copying-u-s-climate-data-fearing-it-might-vanish-under-trump/) in the *Washington Post* about a group of volunteers getting together for an event at the University of Toronto. My reasons for going were transparent: I was putting together a startup, and hoping to do some user interviews, maybe attract some attention in the process. This plan died the moment I heard what we were there to do:

**Build a crowdsourced archive of the United States Environmental Protection Agency**

Um, ok.

This event would be the first for the Environmental Governance & Data Initiative ([EDGI](https://envirodatagov.org/)) and the beginning of the [Data Rescue Movement](https://en.wikipedia.org/wiki/Data_rescue).

> DataRescue events were organized by local communities with support from EDGI and DataRefuge. From Fall 2016 through Spring 2017 they brought together scientists, coders, librarians, and volunteers to identify and preserve at-risk datasets in collaboration with the Internet Archive. In the three months following the 2016 election, events worked to extensively seed the Internet Archive’s End of Term Harvest project.

Data Rescue was a trip. Over fifty events across the country brought thousands of volunteers out to take an active role in civic engagement. Organizers ran these events on the fly, without an explicit budget and in their spare time. Most Data Rescues were held at libraries on weekends. Those Saturday mornings often started by greeting a procession strangers who had no idea what they were in for, and always ended in a euphoric mix of exhaustion and accomplishment.

After the Toronto event it was clear Qri could wait. I dropped everything and joined EDGI's Archiving working group to focus on supporting Data Rescue events full time. I spent the following eight months supporting event organizers on the technical side of things. When I wasn’t physically at events I was building software, hot-fixing bugs, keeping servers up, whatever seemed like it would help. Having no money but *many* capable colleagues gave me a first-class education in open collaboration.

I learned a lot about data at Data Rescue. Most of the lessons I still focus on come from a working track we affectionately called, "custom crawls" or "uncrawlables.” Working on uncrawlables entailed writing tailor-made code to extract things Internet Archive crawlers couldn't automate: Databases, APIs, datasets accessed by jumping through User Interface hoops, etc. Uncrawlables tended to attract nerds. Nerds are my kind of people.

In the first events we nerds worked up a system for classifying and processing uncrawlables with a google sheet. Volunteers from another track used a browser plugin to seed the Internet Archive’s End of Term crawl. That plugin had an option to flag a url as uncrawlable, which dumped a url & short form description onto an inbox spreadsheet for review. A volunteer with technical chops–and if we were lucky, someone who actually worked with the data–would sort through the list, sending urls worth chasing to another sheet, where volunteers with any degree of programming skill would divvy up the work. Volunteers used whatever tools they were familiar with, often completing work hours or days after the event ended. I could the feel the pride on the other end of a slack DM: "my script finally ran, I have 150 Gigs of stuff, now what?"

Early events iterated and riffed on this spreadsheet workflow with input from lots of different people. The spreadsheets finally gave out at an event in Ann Arbor, with so many people editing at once the system ground to a halt. We slammed together an app, built an S3 uploader that I'm still kinda proud of, and established something resembling a bucket-brigade system for mass grassroots archiving. Many volunteers continued this pattern of putting out the biggest fire well into the point of burnout, but with each fix we learned something new, and did our best to pass that knowledge to the organizers & attendees at the next event.

If you work around data, however, you might be able to spot a problem that many others saw. I had just finished explaining the above process at an event in New York when one volunteer raised his hand & turned to address the crowd. The actual quote is lost to history, but to paraphrase:


> “This process is not rigorous enough. The simple act of opening a file can affect the underlying data, and all these people are putting their greasy hands on everything, making it useless to anyone who wants to depend on it. Don’t get me started on what we do when the data we're archiving changes. We should all go get a beer instead of doing this.”

Of course, he was right. We were engaging in "smash and grab" archiving that didn't produce results someone (researchers, scientists, citizens, anyone) could depend on. Words like _provenance_ started coming up a lot. Moving bytes was the easy part, the hard part was proving you'd done it properly.

This “y’all suck at archiving” point was reinforced when we began talking to the web archiving community. I was surprised to learn _there was a web archiving community_, but less surprised to hear we’d angered them by throwing decades of professional practice out the window. Data Rescue was *very* good at corralling interest, but no process existed for groups of people to go from zero-to-archivist in a day. We’d gotten good at moving bytes, but had no good answer for the “trust” part. As it turns out, producing reliable data is really hard. Doing it with no tools in place was a bridge too far, which led to a question I've been playing with ever since:

**How do we move data and keep the trust?**

The question of trust is an intrinsic property of data. All data is the product of a decision to record something, and trust in data comes from how the decisions of what to include are justified. Often trust in data is external: “I’m a famous economist, this is my data,” or “I saw this on Twitter" (AKA you shouldn’t trust this, but will).

This trust question applies to archiving (or moving) a dataset as much as it does to creating one. Moving data from its host is a change, and every undocumented decision surrounding that change diminishes the usefulness of the underlying data. What's worse, it's hard to prove a negative. Absent _copious_ evidence that an archive has integrity, it's best to assume the worst. Often the effort it takes to *interpret* these decisions and justifications makes it's not worth moving at all when the original source data is available. The fact that the process of archiving data is untenable is a failure of both our tools and the culture our tools have shaped.

"Moving data with trust" might sound like a niche problem. Since EPA.gov is only occasionally down, this isn't really that big a deal, right? 

Look at it another way: "moving data" is shorthand for "changing its home," which is a *change*. The above question is part of a more general problem:

**How do you change data and keep the trust?**

That problem is everywhere. On the small-but-frequent end of the scale we have:
*"I download this dataset, pull out these two columns, then run a calculation. Trust me, it's the same data, and after all I'm pretty good at excel."*

On the high-end of the scale we have:
*"We spend five million dollars a year maintaining our ETL pipeline, and our Business Intelligence department says the data it produces is vital. They keep making dashboards with that data, but I really wish they would just export to excel."*

If you don't trust that person, you won't trust their calculation. If you don't work at that company, you can’t access that data at all. Hell, even if you do work at that company, you may not be trusted. In both contexts **the thing that makes the data trustworthy doesn’t travel with it.**

These are all problems of trust, specifically being able to audit the provenance of a dataset. If you understand the series of decisions that comprise the data you're looking at, you're in a position to judge for yourself whether the dataset is worth your time.

In the context of the Data Rescue project, we had every reason to trust each other’s work, but what assurances were we providing the outside world (for whom all of this work was being undertaken?). In the end, despite the best intentions and effort of Data Rescue volunteers, the data we backed is lacking in trust, and therefore, largely goes unused today.

Fortunately, most volunteers hung long enough to complete a bunch of work. So, not only did we get to see the various tools and techniques used to archive data, we got a _spreadsheet_. A spreadsheet where people coordinated to *divide up work and share results*. Because of this, we got to skip the trust question and move straight to answering a different question: "how much ground can a group of people cover with minial training and loose coordination?". The answer to that question is _a lot_. I got to spend months living on this other planet, where people worked together on data building a common resource at lightning speed. Not everyone produced perfect datasets. A few volunteers produced _phenomenal_ datasets. _Everyone_ got better at working with data in the process.

I’m convinced that with better, purpose-built tools, the work of Data Rescue volunteers would have materially changed the way we think about working with data. It’s happened before. Some of the greatest examples of open collaboration success stories are right next to this data problem. Open-source software & Wikipedia are my favourites. All of these efforts use a ["bazaar"](https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar) model of labour exchange, where the "dividing up the work" happens on a volunteer basis, and the value of work is largely determined by how much that work is _used_. For a number of reasons, there is no "data bazaar" today, and all tools for working with data don't support building one.

**An explosion of inquiry and productivity is held back because we don't have a data bazaar.** There are conversations we're not having, work that is too laborious to undertake, and questions that are going unasked and unanswered.


- Which county in my state has the cleanest water, and how much do local residents pay for it on average?
- What’s the average age parents give their kids a cell phone? Why don't I know if that average works for both "city kids" and "country kids"? For my kids?
- How much do local rents vary by how close the apartment is to public transportation?
- What was the state income tax rate for Wyoming in 1964? 1965? How has the rate changed over the last 50 years?
- How have the prices of bottles of a given wine varietals correlated with precipitation trends?
- Which NBA team pays the most in salary for each point scored over a season?


I can go on. If I go on long enough, we'll get to a question you've always wanted to know the answer to. All of these questions are providing the same _statistical backdrop_ that large companies use right now to sell us stuff. I’d like to see it applied it to things that *actually impact your life*. You don't need to care about the Toxic Release Inventory dataset from the EPA, but that data can be used to inform whether it's a good idea to buy bottled water based on where you live.

**By working together, we can ask more and better questions. We can raise expectations of what data can do for everyone.**

This problem is big enough that I believe we’ll need to work together to address it. We'll also need tools that encourage us to work together - tools that automate away as many burdens as possible, because *stats work is as painful as it is important*.

We've spent the two years turning Qri into the tool I wish we had at Data Rescue. A tool for building a data bazaar. Like me, the course of Qri has adapted in response to the incredible people I've collaborated with. We believe that if Qri is meant to help us work together, we should build it together. That’s why we’ve made Qri an open-source project. I hope you’ll consider collaborating with us, and that you’ll consider us partners in the effort to make data work for everyone.