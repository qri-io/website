---
metaTitle: "Datawrapper"
metaDescription: "Visualizing a qri.cloud dataset with datawrapper"
---

import ImageWithCaption from '../../../src/components/ImageWithCaption.js'

In this doc we will explore how to use the popular visualization tool [datawrapper](https://www.datawrapper.de/) with data sourced _directly_ from a dataset hosted on qri.cloud.  There's no need to download and juggle files, you can call the data straight from the source using the qri.cloud API.

## Get the API call for a CSV

Once a dataset is published on qri.cloud, its components can be accessed via our API.  To get the dataset body as a CSV, the API call looks like this:
```
https://api.qri.cloud/get/{username}/{datasetname}/body.csv?all=true
```
Don't have a good chart-worthy qri dataset ready to go?  We've got you covered.  Here's a qri dataset with 30 days of earthquakes from September 2020: https://qri.cloud/qri-demo-data/earthquakes

Let's copy the API url for its CSV and go play with datawrapper!  
```
https://api.qri.cloud/get/qri-demo-data/earthquakes/body.csv?all=true
```

(You can also paste this url into a web browser and it will download a CSV file)


## Visualize the Data in datawrapper

Head over to [https://www.datawrapper.de/](https://www.datawrapper.de/) and click the "START CREATING" button.  You'll land on the 'Upload Data' step of the wizard.  Choose 'Link external dataset' and paste in the API call url for your qri dataset.  

<ImageWithCaption
  src='/img/docs/integrating-qri/datawrapper-load.png'
  caption="Use 'Link external dataset' to use your qri API call in datawrapper"
/>

Check things out in the "Check & Describe" step, then proceed to "Visualize"

We can use the scatter plot chart to show `depth` x `mag`, and a clear pattern emerges.  There are many overlapping points, so tweaking the opacity helps show where the clustering is denser.

<ImageWithCaption
  src='/img/docs/integrating-qri/datawrapper-scatter.png'
  caption="Use a scatter plot to show the intersection of two numerical ranges"
/>

Datawrapper wanted to place labels on the outliers, so I chose the `place` column to help identify these earthquakes that don't fit the trend.

Continue to the publish and embed step.  Here's the iframe embed, which you can interact with.  Hover over a dot in the scatter plot to see the `place` record for that earthquake

<iframe title="Earthquake Depth x Magnitude" aria-label="chart" id="datawrapper-chart-PpwNb" src="https://datawrapper.dwcdn.net/PpwNb/2/" scrolling="no" frameborder="0" style="border: none;" width="600" height="400"></iframe>

## Keeping it up to Date

The API call we used will always get the latest version of the dataset, so if you push another version, your datawrapper visualization will automatically use the new data. Datawrapper periodically downloads the data unless you specify that you want your chart to load it directly from the source.  Either works, but the former may have a lag

## Onward!

Once you've pushed your dataset to qri.cloud, our API allows you to integrate with any tools that "speak CSV".  Your dataset is also versioned, and the API call for the body will always get you the latest data.  It's also possible to grab older versions via the API if you ever need them.

Have you tinkered with data from the qri API in datawrapper?  We'd love to hear from you.  [Drop us a line on twitter](https://twitter.com/qri_io) or [hop into our public discord](https://discordapp.com/invite/thkJHKj).
