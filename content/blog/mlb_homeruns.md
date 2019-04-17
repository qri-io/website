---
title: "MLB Home Runs"
date: 2019-04-10T15:00:00-04:00
draft: true
tags:
- Baseball stats
- transform script
- web scraping
author:
  given_name: Rico
  family_name: Gardaphe
  display_name: Rico
author:
  given_name: Kasey
  family_name: Huizinga
  display_name: ramfox
description: Kasey & Rico created a qri dataset from the MLB Home Run rankings on baseballreference.com
---

**Summary:**

- *Create a clean, useful qri dataset by scraping web-based baseball data stored online in an ugly table.*
- *Rerun the script to retrieve updated data (however frequently you like)*
- *See and have the code I used to create my dataset, and feel free to fork that code to your liking.*
 
 **** 
 
Look up the latest rankings of [MLB home run leaders on baseballreference.com](https://www.baseball-reference.com/leaders/HR_career.shtml) (the authority on MLB stats), and you’ll get a table like this:
 
<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/br_table.png" />
</div>
 
 
It’s straightforward if you’re mostly interested in the player’s rank and home run counts, each of which has a dedicated column. Less helpful: the table provides interesting information in a code that needs to be cracked and translated before you can use the data for your own purpose.
 
For example:

- A player’s Hall of Fame status is signified by a “+ “ appearing next to their name. If you see a "+", they're a Hall of Famer, if you don't, they're not.
- The number of MLB seasons played is in parentheses next to their name.
- However! If the player is still active, their name is in bold, and the first number in their parenthesis is their number of seasons, and the second number is their current age.
- Every 50th row, the table maker introduces a new header row, which you'll have to cut out 20 times in a list of 1,000 names (as this is).


---
 <div class="tenor-gif-embed" data-postid="4679471" data-share-method="host" data-width="100%" data-aspect-ratio="1.7913669064748199"><a href="https://tenor.com/view/eww-jimmy-fallon-ew-gif-4679471">Eww Jimmy Fallon GIF</a> from <a href="https://tenor.com/search/eww-gifs">Eww GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>
---

---

People who play with data on a regular basis are shaking their heads and wondering aloud, “What’s wrong with having another column that says Hall of Fame "Yes/No", another column that says, Active "Yes/No” etc. Best practices recommend a column (or cell) convey a single piece of information, to simplify future data manipulation and analysis. From this point, users of this home run data will copy this table into a spreadsheet and manually clean it to their liking before beginning an analysis. It’s estimated that this kind of work comprises up to [80% of a data scientist’s job](https://www.forbes.com/sites/gilpress/2016/03/23/data-preparation-most-time-consuming-least-enjoyable-data-science-task-survey-says/#62fb35096f63). Ugh. 


**Wouldn’t it be nice…**

  **A.** Wouldn’t it be nice if we could all benefit from the first person’s work to clean up that dataset?
  
  **B.** Wouldn’t it be nice to know if we can trust their cleaning work by easily auditing / tracking their steps?
  
  **C.** Wouldn’t it be nice to know that if I wanted to take a different approach, I could take their work, copy it, and adapt it as I saw fit?
  
  **D.** And wouldn’t it be nice to have the script tied to the data, so I could simply re-run it and retrieve updated rankings? [Coming soon: Ability to set a script to retrieve the baseball reference data at a specific frequency, so I could have a new version every day, week, month, or season]
  
 
I’ve used qri to do each of those. Here’s how:
 
**Transform Scripts: from web scraping to a qri dataset**

We use a python-like syntax called Starlark to draft a Transform script to pull in data from the wild, and tweak the way it’s represented. For example, I used my script to create new columns for the player’s hall of fame status and active/inactive status. That accomplishes A & B from the list above. Here’s what that looks like: 

<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script1.png" />
</div>

When you click over to ‘body’, you’ll see the data displayed in a table, like so:

<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/qri_venn_diagram_white.png" />
</div>
 
**"But, I'd do it a bit differently"**

If you'd take a different approach with this data, say, by wanting figures in the “Bats” column to say ‘Switch’ instead of ‘B’ (for both, as it does on baseballreference.com), here’s how you might copy my script, and edit it to include this kind of transformation. This accomplishes item C from our list.
 

  **Step 1.** Click the ‘add’ button that appears near my dataset when you’re viewing my collection. This saves the exact same dataset (body, transform, metadata, structure, viz, and commits ) to your node.


  **Step 2.** Click on the pencil to go into edit mode.


  **Step 3.** Click on Transform, so you can begin to edit the script.  In rows 119 and 120 of the image below, I redefine ‘B’ as ‘switch’, and when I run the script, the data comes back just the way I want it. 

Here's what that code might look like:

```python
if bats == "B"
	bats = "switch"
```

 <div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script2.png" />
</div>
 
And here's what an updated table looks like:

 <div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script2.png" />
</div>


**But, what if the source data changed (aka, was updated)**

Okay, last cool thing. I can update this dataset by rerunning the script (aka, saving a new version of the data), which brings me the updated data from baseballreference.com. [COMING SOON: clicking a simple ‘Update’ button on the front end]. This comes in handy if you know that the last time I ran my script was on Day 4 of the season, and you’re wondering what the rankings look like today. Here’s how:


  Step 1. Overview > Edit > Transform > Dry Run / Save. Boom. Done!

 
We’ve also set up a [github repo]() to demo how to do all of this from the command line. Give it a look!
 
 
----
**FOR HUMANS: Just tell me what your script did to the data**

 Here's a breakdown of what my script does to the source data. Please reach out if you have any questions on it (hello@qri.io), or want to adapt it to scrape other data you're interested in.* 
 

- I added a Rank value for any rows in which there is no rank value. Those blank rows actually share the same rank as the last listed number. 
- I took any cell of a player name, and removed the “+” value and the numbers within parentheses next to any player name (e.g, “(14, 36)”)
- Any player with a “+” next to their name is a hall of famer, so I created a new column, “Hall of Fame (Y/N)” and put a Yes in any row corresponding to a player name cell that had a  “+” value, and a “No” in any row without one
- Eliminated those pesky header rows.
- I took bolded names (which are active players), created a new column “Active (Y/N)” and placed a Yes in any row corresponding to a bolded name, and a No in any row without one.
- Anyone with a bolded name (active player) has two numbers that appear in parentheses next to their name. The first number (for every player in the list) is the number of seasons they’ve played, the second number is their current age (it is only listed if the player is still active). I created two columns for Years in MLB and “Age (if active)”. I moved the first number after each open parenthesis into the “Years in MLB” column, and the second number (if present) into the “Age (if active)” column.
- Deleted the column “HR Log”*



