---
title: "Python quickstart"
description: ""
date: 2018-08-21T00:00:00-04:00
section: tutorials
draft: true
---

# Python Quickstart

1. [Before you start](#part1)
2. [Install the Python Client](#part2)
3. [Work with qri in a Jupyter Notebook](#part3)

<a id="part1"></a>
# 1. Before you start

Qri has a simple python client that makes it easier to work with qri datasets using the tools you already use--like pandas and Jupyter.  

Since the qri python client is using qri under the hood, for it to work correctly you need to have qri setup and installed before using the python client.  To install qri, you can either install the [desktop app for OS X or the CLI](https://qri.io/download/) and create your repo (for the CLI run `qri setup` to do this).

Next try adding a dataset. If you need an example dataset (or would like to follow along in later steps) you can download one from our repo with the following command
```sh
curl https://raw.githubusercontent.com/qri-io/qri-python/master/example_data/body.csv -o "body.csv" https://raw.githubusercontent.com/qri-io/qri-python/master/example_data/head.yaml -o "head.yaml"
```
And to add it, from the directory of your downloaded files run
```sh
qri new  --file head.yaml --body body.csv me/BirthdatesOfUSPresidents
```
(where 'presidentBdays' can be changed to any name you find descriptive)
If this succeeds you should be good to move on to installing and using the qri python client.

<a id="part2"></a>
# 2. Install the Python Client

Ensure that you are running python 3 and then install with 
```sh
pip install qri
```

<a id="part3"></a>
# 3. Work with qri in a Jupyter Notebook

The qri python client does not currently support the full array of features available in the desktop and CLI clients.  The functionality it does currently support includes

- listing datasets saved in your repo
- loading datasets into a pandas dataframe for manipulation in python
- saving dataset back to your repo

To demonstrate the functionality we'll walk through loading, changing, and saving the dataset we just added in a Jupyter notebook:

------
first  we import qri 
```python
import qri
```
to see what datasets we have in our repo, we use `qri.list_ds`
```python
qri.list_ds()
```




    ['fivethirtyeight/weather_ksea',
     'dustmop/test3_repo',
     'osterbit/BirthdatesOfUSPresidents']

To load a dataset into memory, use `qri.load_ds`, passing the name of the dataset you want to load.
```python
ds = qri.load_ds('osterbit/BirthdatesOfUSPresidents')
```
The python `QriDataset` is represented as an object with two properties: a `head` containing the dataset's metadata as a python dictionary and a `body` containing the data as a pandas dataframe. To manipulate these objects we can just use the native methods already available to them.
```python
ds.head
```




    {'bodyPath': '/ipfs/QmV5kQAyeDEJKkTTk97pEAFCnEty2iRvrzErYhgsz87BZu',
     'commit': {'author': {'id': 'QmQDAHk8jx6mJ1migbC6oEij52odepBV7RHBoGoGFWUr7F'},
      'path': '/ipfs/QmUpPqbzXQMWFDXChruFH4JTJchbHkGNyaL9A6g9LWXbJa',
      #...
     'meta': {'description': 'Date and location of birth and death of US Presidents as of 2018',
      'qri': 'md:0',
      'title': 'Birthdsates of US Presidents'},
     'path': '/ipfs/QmQc5vDSpa9UfpUu9o2vpmahoVJueE5F7mdgoS1pfD37kR/dataset.json',
     'qri': 'ds:0',
     'root': 'osterbit/BirthdatesOfUSPresidents@QmQDAHk8jx6mJ1migbC6oEij52odepBV7RHBoGoGFWUr7F/ipfs/QmQc5vDSpa9UfpUu9o2vpmahoVJueE5F7mdgoS1pfD37kR',
     'structure': {'checksum': 'QmPtotmvHgy8bREmf5oQKN5EDKfpjzjUYmeunXyqV9UVHR',
      #...
      'schema': {'items': {'items': [{'title': 'president', 'type': 'string'},
         {'title': 'birth_date', 'type': 'string'},
         {'title': 'birth_place', 'type': 'string'},
         {'title': 'death_date', 'type': 'string'},
         {'title': 'location_of_death', 'type': 'string'}],
        'type': 'array'},
       'type': 'array'}}}

You'll notice in the body below, that the field 'birth_date' is inconsistently formatted. In some entries the date is abbreviated while in others it is written out, and on the later entries the date is given with the day before the month:

```python
ds.body
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>birth_date</th>
      <th>birth_place</th>
      <th>death_date</th>
      <th>location_of_death</th>
      <th>president</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Feb 22, 1732</td>
      <td>Westmoreland Co., Va.</td>
      <td>Dec 14, 1799</td>
      <td>Mount Vernon, Va.</td>
      <td>George Washington</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Oct 30, 1735</td>
      <td>Quincy, Mass.</td>
      <td>July 4, 1826</td>
      <td>Quincy, Mass.</td>
      <td>John Adams</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Apr 13, 1743</td>
      <td>Albemarle Co., Va.</td>
      <td>July 4, 1826</td>
      <td>Albemarle Co., Va.</td>
      <td>Thomas Jefferson</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Mar 16, 1751</td>
      <td>Port Conway, Va.</td>
      <td>June 28, 1836</td>
      <td>Orange Co., Va.</td>
      <td>James Madison</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Apr 28, 1758</td>
      <td>Westmoreland Co., Va.</td>
      <td>July 4, 1831</td>
      <td>New York, New York</td>
      <td>James Monroe</td>
    </tr>
    <tr>
      <th>5</th>
      <td>July 11, 1767</td>
      <td>Quincy, Mass.</td>
      <td>Feb 23, 1848</td>
      <td>Washington, D.C.</td>
      <td>John Quincy Adams</td>
    </tr>
    <tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>33</th>
      <td>29-May-17</td>
      <td>Brookline, Mass.</td>
      <td>22-Nov-63</td>
      <td>Dallas, Texas</td>
      <td>John F. Kennedy</td>
    </tr>
    <tr>
      <th>34</th>
      <td>27-Aug-08</td>
      <td>Gillespie Co., Texas</td>
      <td>22-Jan-73</td>
      <td>Gillespie Co., Texas</td>
      <td>Lyndon B. Johnson</td>
    </tr>
    <tr>
      <th>35</th>
      <td>9-Jan-13</td>
      <td>Yorba Linda, Cal.</td>
      <td>22-Apr-94</td>
      <td>New York, New York</td>
      <td>Richard Nixon</td>
    </tr>
    <tr>
      <th>36</th>
      <td>14-Jul-13</td>
      <td>Omaha, Nebraska</td>
      <td>26-Dec-06</td>
      <td>Rancho Mirage, Cal.</td>
      <td>Gerald Ford</td>
    </tr>
    <tr>
      <th>37</th>
      <td>1-Oct-24</td>
      <td>Plains, Georgia</td>
      <td></td>
      <td></td>
      <td>Jimmy Carter</td>
    </tr>
    <tr>
      <th>38</th>
      <td>6-Feb-11</td>
      <td>Tampico, Illinois</td>
      <td>5-Jun-04</td>
      <td>Los Angeles, Cal.</td>
      <td>Ronald Reagan</td>
    </tr>
    <tr>
      <th>39</th>
      <td>12-Jun-24</td>
      <td>Milton, Mass.</td>
      <td></td>
      <td></td>
      <td>George Bush</td>
    </tr>
    <tr>
      <th>40</th>
      <td>19-Aug-46</td>
      <td>Hope, Arkansas</td>
      <td></td>
      <td></td>
      <td>Bill Clinton</td>
    </tr>
    <tr>
      <th>41</th>
      <td>6-Jul-46</td>
      <td>New Haven, Conn.</td>
      <td></td>
      <td></td>
      <td>George W. Bush</td>
    </tr>
    <tr>
      <th>42</th>
      <td>4-Aug-61</td>
      <td>Honolulu, Hawaii</td>
      <td></td>
      <td></td>
      <td>Barack Obama</td>
    </tr>
    <tr>
      <th>43</th>
      <td>14-Jun-46</td>
      <td>New York, New York</td>
      <td></td>
      <td></td>
      <td>Donald Trump</td>
    </tr>
  </tbody>
</table>
</div>

## Fixing the data
To fix the inconstent date formatting, we'll write a function to parse the dates. It looks like there are 3 different formats so we'll want to handle each of these (for more info on dates and strings in python [strftime.org](http://strftime.org/) has a good cheat sheet).
```python
import datetime
def parse_date(date_string):
    for date_fmt in ('%b %d, %Y', '%B %d, %Y', '%d-%b-%y'):
        try:
            return datetime.datetime.strptime(date_string, date_fmt)
        except ValueError:
            pass
    raise ValueError('unable to parse dates with given formats')
```
If we apply this function alone we'll have an issue where two digit years are assumed to be prefixed with '20'- rather than '19'-. So we'll use the fact that a president must be at least 35 years old to fix this and then combine the two functions and convert back to a string:

```python
def fix_date(date, max_year, adjustment=100):
    if date.year > max_year:
        # if the year is gt than our max date it is making an error on the century (1900s vs 2000s)
        corrected_date = datetime.datetime(year=date.year-adjustment, month=date.month, day=date.day)
        return corrected_date
    else:
        return date

# (combining the above)
def make_dates_consistent(date_string):
    # parse the date into a datetime object
    date_obj = parse_date(date_string)
    # since the minimum age to be president is 35
    # we'll set the max year to reflect that
    max_possible_dob_year = datetime.datetime.today().year - 35
    dob = fix_date(date_obj, max_possible_dob_year)
    # since csv's don't know about datetime objects we'll convert back to a string
    # since it's easy to do we'll also include a format that also gives the day of the week
    fmt = "%a %b %d, %Y"
    return dob.strftime(fmt)
```

Now we can apply this function to the field as we would with a regular dataframe:

```python
ds.body['birth_date'] = ds.body['birth_date'].apply(lambda d: make_dates_consistent(d))
```
Next we check the output to make sure it worked: 
```python
ds.body
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>birth_date</th>
      <th>birth_place</th>
      <th>death_date</th>
      <th>location_of_death</th>
      <th>president</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Fri Feb 22, 1732</td>
      <td>Westmoreland Co., Va.</td>
      <td>Dec 14, 1799</td>
      <td>Mount Vernon, Va.</td>
      <td>George Washington</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Sun Oct 30, 1735</td>
      <td>Quincy, Mass.</td>
      <td>July 4, 1826</td>
      <td>Quincy, Mass.</td>
      <td>John Adams</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Sat Apr 13, 1743</td>
      <td>Albemarle Co., Va.</td>
      <td>July 4, 1826</td>
      <td>Albemarle Co., Va.</td>
      <td>Thomas Jefferson</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Tue Mar 16, 1751</td>
      <td>Port Conway, Va.</td>
      <td>June 28, 1836</td>
      <td>Orange Co., Va.</td>
      <td>James Madison</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Fri Apr 28, 1758</td>
      <td>Westmoreland Co., Va.</td>
      <td>July 4, 1831</td>
      <td>New York, New York</td>
      <td>James Monroe</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Sat Jul 11, 1767</td>
      <td>Quincy, Mass.</td>
      <td>Feb 23, 1848</td>
      <td>Washington, D.C.</td>
      <td>John Quincy Adams</td>
    </tr>
    <tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>33</th>
      <td>Tue May 29, 1917</td>
      <td>Brookline, Mass.</td>
      <td>22-Nov-63</td>
      <td>Dallas, Texas</td>
      <td>John F. Kennedy</td>
    </tr>
    <tr>
      <th>34</th>
      <td>Thu Aug 27, 1908</td>
      <td>Gillespie Co., Texas</td>
      <td>22-Jan-73</td>
      <td>Gillespie Co., Texas</td>
      <td>Lyndon B. Johnson</td>
    </tr>
    <tr>
      <th>35</th>
      <td>Thu Jan 09, 1913</td>
      <td>Yorba Linda, Cal.</td>
      <td>22-Apr-94</td>
      <td>New York, New York</td>
      <td>Richard Nixon</td>
    </tr>
    <tr>
      <th>36</th>
      <td>Mon Jul 14, 1913</td>
      <td>Omaha, Nebraska</td>
      <td>26-Dec-06</td>
      <td>Rancho Mirage, Cal.</td>
      <td>Gerald Ford</td>
    </tr>
    <tr>
      <th>37</th>
      <td>Wed Oct 01, 1924</td>
      <td>Plains, Georgia</td>
      <td></td>
      <td></td>
      <td>Jimmy Carter</td>
    </tr>
    <tr>
      <th>38</th>
      <td>Mon Feb 06, 1911</td>
      <td>Tampico, Illinois</td>
      <td>5-Jun-04</td>
      <td>Los Angeles, Cal.</td>
      <td>Ronald Reagan</td>
    </tr>
    <tr>
      <th>39</th>
      <td>Thu Jun 12, 1924</td>
      <td>Milton, Mass.</td>
      <td></td>
      <td></td>
      <td>George Bush</td>
    </tr>
    <tr>
      <th>40</th>
      <td>Mon Aug 19, 1946</td>
      <td>Hope, Arkansas</td>
      <td></td>
      <td></td>
      <td>Bill Clinton</td>
    </tr>
    <tr>
      <th>41</th>
      <td>Sat Jul 06, 1946</td>
      <td>New Haven, Conn.</td>
      <td></td>
      <td></td>
      <td>George W. Bush</td>
    </tr>
    <tr>
      <th>42</th>
      <td>Fri Aug 04, 1961</td>
      <td>Honolulu, Hawaii</td>
      <td></td>
      <td></td>
      <td>Barack Obama</td>
    </tr>
    <tr>
      <th>43</th>
      <td>Fri Jun 14, 1946</td>
      <td>New York, New York</td>
      <td></td>
      <td></td>
      <td>Donald Trump</td>
    </tr>
  </tbody>
</table>
</div>

## Saving your improvements
Finally, we save the dataset back to our repo with a commit message describing the changes we made:
```python
ds.save("fixed inconsistent date formatting", publish=True)
```

    posting dataset to registry ...
    
    dataset saved
