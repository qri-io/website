---
title: "features"
date: 2017-10-30T00:00:00-04:00
draft: true
---

# Qri Design Goals

While qri doesn't do all of these things today, it will someday. All of these concrete deliverables are aimed at making your experience working with data better. By “you” we don’t mean just people who can program, but  anyone who has ever used a spreadsheet. We plan to do all of this without ever requiring you to code. If you do know how to code, we’ll make it so your skills play nicely with this whole system.

1. Free
2. Dramatically reduce duplicative work
3. Frictionless
4. Synchronized
5. Attributed
6. Dramatically cut down on “link rot”
7. Smaller storage footprint
8. user-friendly
9. machine-friendly
10. More is Better
 
We want to get as many data problems out of the way to make as much room as possible for data questions. We’ve called the project qri (pronounced “query”) as a way of keeping ourselves focused on those data questions.
 
Free
No one has built "github for data" because if you store a user's data, the cost of serving the average user outstrips the money you make from them. This is true today, and anyone offering free storage is either spending someone else's money or making money from you in another way. On the distributed web, everyone can make a piece of their own hard drive available for storage, which removes the cost of storage. By asking you B-Y-O hard drive to store the data you want, we can drop the cost to zero and mean it.
 
Never munge the same dataset twice
By leveraging some new tricks (content addressing, hash collisions, and metadata search) we’ll end up with a tool that’ll let you know if a file has already been worked on. You’ll be able to use a file to check to see if it’s been turned into a dataset anywhere in the world. This means if someone in your office adds a file you both have to qri, you don’t need to ask if they’ve added it, it’ll de-duplicate automatically. 
 
Frictionless
Frictionless means you can make any dataset work/play with any other dataset. __[EXAMPLE]__. You can compare weather patterns with sports outcomes, can search for spurious correlations, 
 
The other way we mean “frictionless” is by integrating with as many existing data tools as possible. We’ll integrate with tools like Jupyter Notebook, R and others.
 
Keep everything in sync
We’ll do this by checking data transformations into version control. This is a concept that takes time to unpack at the technical level, but the goal is simple: If you make a dataset and transform the data in some way (say by combining it with another dataset or running it through a formula), we record the transformation and its result. That way when you go back and change the original dataset, we can automatically re-run the stuff (queries) you did on the updated data.
 
All changes are attributed
Every node on the network will require changes be cryptographically signed and timestamped. This is required to maintain the digital provenance of a dataset. If data is going to be used in a professional context, it must be auditable. Digital provenance is both tedious and tricky, so we’ll do it in the background for you. 
 
We should say that the attribution model we’re working with allows for anonymous users, so while all changes must be attributed to someone, you always know who that person is. We’ll make this distinction clear, and you will be able to make judgement calls about weather or not to work with data based on your view of anonymity.
 
Dramatically cut down on “link rot”
Replacing URLS with content-addressed, immutable data means that the only way to “rot” a link is to make all copies of that data unavailable on the network.
 
Smallest possible storage footprint
If you think about versioning a dataset, that sounds like it’s going to take up lots of hard drive space. In a content-addressed world, two slightly different datasets don’t take up twice the space.
 
User Friendly
By making a system specific to datasets, we’re hoping to make it easier to work with than more general tools like git. The number of people who work with data vastly outstrips the number of people who work with code, so we hope to build this tool with that in mind. We're hoping to remove language like “commits” and replace it with more human oriented words like “changes”.
 
That being said, programmers are users too, so our CLI will ship with a nice set of git-like aliases wherever the two systems overlap to keep terminology gymnastics to a minimum.
 
Machine Learning Friendly
Structured, frictionless, connected data is everything our machine underlords have been asking for.  With qri, the process to prepare data to train machine learning models will be dramatically simpler and take less time.
 
Everything gets faster and cheaper the more people use it 
A data promised land brings powerful networks effects.  As user numbers grow, storage costs fall and the rate of knowledge transfer increases. 