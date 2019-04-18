---
title: "MLB Home Runs"
date: 2019-04-17T15:00:00-04:00
draft: false
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

- *Create a clean, reusable qri dataset by scraping data stored in an ugly table.*
- *Rerun a script to retrieve updated data (however frequently you like)*
- *See and have the code I used to create my dataset, and feel free to fork that code and adapt to your liking.*
 
 **** 
 
Look up the latest rankings of [MLB home run leaders on baseballreference.com](https://www.baseball-reference.com/leaders/HR_career.shtml) (the authority on MLB stats), and you’ll get a table like this:
 
<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/br_table.png" />
</div>
 
 
If all you care about is the player’s rank and home run count, each of which has a dedicated column, this table works just fine. Less helpful, the table provides interesting information in a code you need to crack before adapting the data for your own purpose.
 
For example, in the baseballreference.com table:

- A player’s Hall of Fame status is signified by a “+ “ appearing next to their name. If you see a "+", they're a Hall of Famer, if you don't, they're not.
- The number of MLB seasons played is in parentheses next to their name.
- However! If the player is still active, their name is in bold, and the first number in their parenthesis is their number of seasons, and the second number is their current age.
- And, in every 50th row, the table maker introduces a new header row, which you'll have to cut out 20 times in a list of 1,000 names (as this is).


---
 <div class="tenor-gif-embed" data-postid="4679471" data-share-method="host" data-width="100%" data-aspect-ratio="1.7913669064748199"><a href="https://tenor.com/view/eww-jimmy-fallon-ew-gif-4679471">Eww Jimmy Fallon GIF</a> from <a href="https://tenor.com/search/eww-gifs">Eww GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>
---

---

Anyone who regularly plays with data is shaking their head and wondering, “Why not have a column that says Hall of Fame "Yes/No", another column that says, Active "Yes/No” etc.? Before a baseball stats fan can work with this table, she will have to copy it into a spreadsheet and manually clean it to her liking before beginning an analysis. No one gets to see her work, and everyone has to 'redo' that same cleaning on their own. It’s estimated that this kind of work comprises up to [80% of a data scientist’s job](https://www.forbes.com/sites/gilpress/2016/03/23/data-preparation-most-time-consuming-least-enjoyable-data-science-task-survey-says/#62fb35096f63). EW! 


**Wouldn’t it be nice…**

  **A.**  Wouldn’t it be nice if we could all benefit from the first person’s work to clean up that dataset?
  
  **B.**  Wouldn’t it be nice to trust their cleaning work by easily auditing / tracking their steps?
  
  **C.**  Wouldn’t it be nice to know that if I wanted to take a different approach, I could take their work, copy it, and adapt it as I saw fit?
  
  **D.**  And wouldn’t it be nice to have the script tied to the data, so I could simply re-run it and retrieve updated rankings? [Coming soon: Ability to set a script to retrieve the baseball reference data at a specific frequency, so I could have a new version every day, week, month, or season]
  
 
I’ve used qri to do each of those. Here’s how:
 
**Transform Scripts: from web scraping to a qri dataset**

We use a python-like syntax called [Starlark](https://qri.io/docs/reference/starlark_syntax/) to draft a Transform script to pull in data from the wild, and tweak the way it’s represented. For example, I used my script to create new columns for the player’s hall of fame status and active/inactive status. That accomplishes A & B from the list above. 

Here’s what that code looks like: 

```python
def parseRow(row, latest_rank):
  # row has 5 sections
  tds = row.children_filtered('td')
  if tds.len() > 0:
    # rank, player (yrs, age), player profile, home runs, bats, hr log
    # 1st td -> rank
    # 2nd td -> player (yrs, age), <a> tag contains player profile link
    # 3rd td -> home runs
    # 4th td -> bats
    # 5th td -> <a> tag contains hr log link
    #
    rank_string = ""
    rank = latest_rank
    player = ""
    hof = "N"
    mlb_seasons = 0
    active = "N"
    age_if_active = "-"
    player_profile_link = ""
    home_runs = 0
    bats = ""
    hr_log_link = ""
    #
    # rank
    #
    rank_string = tds.eq(0).text().strip().strip(".")
    if rank_string != "":
      rank = int(rank_string)
      latest_rank = rank
    #
    # player name, hall of fame status, mlb seasons, active, age if active
    # Dave Winchester+ (23, 59)
    #
    player = tds.eq(1).text()
    player_split = player.split("(")
    #
    # player_split = [ "Dave Winchester+ ", "23, 59)" ]
    #
    name_hof = player_split[0].strip()
    if "+" in name_hof:
      hof = "Y"
      name_hof = name_hof.strip("+")
    player_name = name_hof
    #
    # seasons_age_split = [ "23", " 59" ]
    # or
    # seasons_age_split = [ "23" ]
    #
    seasons_age_split = player_split[1].strip(")").split(",")
    mlb_seasons = int(seasons_age_split[0].strip())
    #
    if len(seasons_age_split) > 1:
      active = "Y"
      age_if_active = int(seasons_age_split[1].strip())
    #
    player_profile_link = base_url + tds.eq(1).find("a").attr("href")
    #
    home_runs = int(tds.eq(2).text().strip())
```

When you run the script and then click over to ‘body’, you’ll see the data displayed in a table, like so:

<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script_top10.png" />
</div>
 
**"But, I'd do it a bit differently"**

Say you want the entries in the “Bats” column to say ‘Switch’ (to signify a switch hitter) instead of ‘B’ (for "Both" right and left-handed, as it does on baseballreference.com). Here’s how you might copy my script and edit it to include this kind of transformation. This accomplishes item C from our list.
 

From the Qri webapp...

  **Step 1.** Click the ‘add’ button that appears near my dataset when you’re viewing my collection of published datasets. This saves the exact same dataset (body, transform, metadata, structure, viz, and commits ) locally to your node.

<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script_add.png" />
</div>


  **Step 2.** Click on the pencil to go into edit mode.


  **Step 3.** Click on Transform, so you can begin to edit the script.  In rows 119 and 120 of the image below, I redefine ‘B’ as ‘switch’, and when I run the script, the data comes back just the way I want it. 

Here's what that code might look like:

```python
    bats = tds.eq(3).text()
    if bats == "B":
      bats = "switch"
```

And when you rerun the script, here's what an updated table (body) looks like:

<div class="clear"></div>

<div class="diagram large">
  <img src="/diagrams/mlb_script_switchb.png" />
</div>


**But, what if the source data changed (has updated since I last checked)?**

Okay, last cool thing. I can update this dataset at any time by rerunning the script (aka, saving a new version of the data), which retrieves the updated data from baseballreference.com. *COMING SOON: clicking a simple ‘Update’ button* This comes in handy if you know that the last time I ran my script was during spring training, and you’re wondering what the rankings look like today. 

Here’s how, again, from the webapp: 
  
  1. From the dataset, click 'Overview'
  
  2. Click 'Edit' 
  
  3. Click 'Transform' 
  
  4. Click 'Dry Run', and when everything looks good
  
  5. Click 'Save'. Boom. Done!

 
**Wrapping It Up**

Hopefully this post showed you some neat tricks for using qri to save yourself and others a bunch of work (and how to audit that work) - for baseball data, or really any data out in the wild. We’ve set up a [github repo](https://github.com/qri-recipes/MLB_Homeruns) to demo how to do all of this from the command line as well, if that's your thing. Give it a look!
 
 
**THE END!**
---

----
**In plain English: "Just tell me what your script did to the data."**

 OK. Here's a breakdown of what my script does to the source data. Please reach out if you have any questions on it (hello@qri.io), or want to adapt it to scrape other data you're interested in. 
 

- *I added a Rank value for any rows in which there is no rank value. Those blank rows actually share the same rank as the last listed number.* 
- *I took any cell of a player name, and removed the “+” value and the numbers within parentheses next to any player name (e.g, “(14, 36)”)*
- *Any player with a “+” next to their name is a hall of famer, so I created a new column, “Hall of Fame (Y/N)” and put a 'Y' in any row corresponding to a player name cell that had a  “+” value, and a 'N' in any row without one*
- *Eliminated those pesky, redundant header rows.*
- *I took bolded names (which are active players), created a new column “Active (Y/N)” and placed a 'Y' in any row corresponding to a bolded name, and an 'N' in any row without one.*
- *Anyone with a bolded name (active player) has two numbers that appear in parentheses next to their name. The first number (for every player in the list) is the number of seasons they’ve played, the second number is their current age (it is only listed if the player is still active). I created two columns for Years in MLB and “Age (if active)”. I moved the first number after each open parenthesis into the “Years in MLB” column, and the second number (if present) into the “Age (if active)” column.*


**Here's the full script:**

```python
load("http.star", "http")
load("html.star", "html")

base_url = "https://www.baseball-reference.com"

def download(ctx):
  res = http.get("https://www.baseball-reference.com/leaders/HR_career.shtml")
  selection = html(res.body())
  table = selection.find('#leader_standard_HR').children().eq(2).children()
  data = []
  latest_rank = 1
  for i in range(0, table.len()):
    (row, latest_rank) = parseRow(table.eq(i), latest_rank)
    if row:
      data.append(row)
  return data

def transform(ds, ctx):
  # [rank, player_name, hof, mlb_seasons, active, age_if_active, player_profile_link, home_runs, bats, hr_log_link
  structure = {
    "format":"json",
    "schema": {
      "type":"array",
      "items": {
        "type":"array",
        "items": [
          {
            "title": "Rank",
            "description": "The rank of the player on the all time HR list"
          },
          {
            "title":"Player Name",
            "description":"The player name"
          },
          {
            "title": "Hall of Famer",
            "description": "Y/N if the player is in the Hall of Fame"
          },
          {
            "title":"MLB Season",
            "description": "Number of seasons this player has played"
          },
          {
            "title":"Active in MLB",
            "description":"Y/N if the player is still active in the MLB"
          },
          {
            "title":"Age If Active",
            "description":"If the player is active, the player's age"
          },
          {
            "title":"Player Profile Link",
            "description":"Link to the player's profile"
          },
          {
            "title":"Home Runs",
            "description":"Number of homeruns the player has hit"
          },
          {
            "title":"Bats",
            "description":"Which side the hitter bats: R/L/B (both)"
          },
          {
            "title":"Home Run Log Link",
            "description":"Link to the player's home run log"
          },
        ]
      }
    }
  }
  ds.set_structure(structure)
  data = ctx.download
  ds.set_body(data)

def parseRow(row, latest_rank):
  # row has 5 sections
  tds = row.children_filtered('td')
  if tds.len() > 0:
    # rank, player (yrs, age), player profile, home runs, bats, hr log
    # 1st td -> rank
    # 2nd td -> player (yrs, age), <a> tag contains player profile link
    # 3rd td -> home runs
    # 4th td -> bats
    # 5th td -> <a> tag contains hr log link
    #
    rank_string = ""
    rank = latest_rank
    player = ""
    hof = "N"
    mlb_seasons = 0
    active = "N"
    age_if_active = "-"
    player_profile_link = ""
    home_runs = 0
    bats = ""
    hr_log_link = ""
    #
    # rank
    #
    rank_string = tds.eq(0).text().strip().strip(".")
    if rank_string != "":
      rank = int(rank_string)
      latest_rank = rank
    #
    # player name, hall of fame status, mlb seasons, active, age if active
    # Dave Winchester+ (23, 59)
    #
    player = tds.eq(1).text()
    player_split = player.split("(")
    #
    # player_split = [ "Dave Winchester+ ", "23, 59)" ]
    #
    name_hof = player_split[0].strip()
    if "+" in name_hof:
      hof = "Y"
      name_hof = name_hof.strip("+")
    player_name = name_hof
    #
    # seasons_age_split = [ "23", " 59" ]
    # or
    # seasons_age_split = [ "23" ]
    #
    seasons_age_split = player_split[1].strip(")").split(",")
    mlb_seasons = int(seasons_age_split[0].strip())
    #
    if len(seasons_age_split) > 1:
      active = "Y"
      age_if_active = int(seasons_age_split[1].strip())
    #
    player_profile_link = base_url + tds.eq(1).find("a").attr("href")
    #
    home_runs = int(tds.eq(2).text().strip())
    #
    bats = tds.eq(3).text()
    if bats == "B":
      bats = "switch"
    hr_log_link = base_url + tds.eq(4).find("a").attr("href")
    #
    return ([rank, player_name, hof, mlb_seasons, active, age_if_active, player_profile_link, home_runs, bats, hr_log_link], latest_rank)
  return (None, latest_rank)
```




