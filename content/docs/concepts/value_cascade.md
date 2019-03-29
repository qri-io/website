---
title: The Source Cascade
date: 2018-01-30T00:00:00-04:00
section: concepts
---

# Value Cascade

A good dataset is as complete and accurate as possible. Good datasets have metadata with a concise yet descriptive title, a description that elaborates, a schema with descriptive details, and so on. When it comes to datasets more detail is better, so long as it's accurate. Because of this, qri provides _lots_ of places to set values. We call those "places that might set values" _sources_. There are 4 sources of values in qri:

* **User-Specified** - users can provide values
* **Scripts** - transforms can set dataset values
* **Previous Version** - values can already be set by the previous version of a dataset
* **Inference** - values qri fills in based on input

Having multiple sources of values creates a problem: 
  
_If the same value is specified in more than one place, only one of places can win out in the end._

We need a set of rules for how these conflicts will be resolved so you don't get super frustrated trying to set a value, only to have it lose to some other source. So we try to keep the rule as simple as possible:
  
_Each Source gets a priority. Values set in higher-priority sources override lower-priority sources._

The "priority of which source wins" is called the **source cascade**, and by default they're in this order from highest to lowest:

* User-Specified
* Scripts
* Previous
* Inference

User-Specified values have the highest priority. This means that if a user updates a dataset, and specifies a `meta.title`, it will override _any other source_.

So let's use an example that outlines:

* The User has specified a `meta.title` property, and that's it
* The previous version has no title specified