# qri.io website

This is the repo for https://qri.io, our beloved website. Changes, fixes & pull requests are welcomed & appreciated.

## Overview

This site is built with [gatsby](https://www.gatsbyjs.org/), a javascript static site generator, using the [gatsby-gitbook-starter](https://www.gatsbyjs.org/starters/hasura/gatsby-gitbook-starter/) site template.  The template has been modified to serve both a full-featured documentation site (markdown files in `/docs`) and standard pages (jsx files in `/pages`)

## Development

You should have `node` and `yarn` already installed on your machine.

You'll also need `gatsby-cli`, which you can install with `npm install -g gatsby-cli`

To run the dev server:

- Clone this repository
- cd to the project directory
- Install dependencies `yarn`
- run the development server `gatsby develop`
- Open `http://localhost:8000` in your web browser

## config

Things such as the site title, navbar links, docs group ordering, etc are all config-driven from `config.js`.

## docs

Documentation pages can be added by creating markdown files in the `/docs` directory.  Directories in `/docs` become groups, and each documentation article must belong to a group.

### Ordering Groups

Group ordering is config-driven using `config.sidebar.forcedNavOrder`

### Grouping Documentation Articles

Articles can be grouped by adding them to a directory.  The directory name will be used for the title unless a markdown file with the same name as the directory exists at the same level as the directory (in this case, the `metaTitle` frontmatter will be used.)

### Ordering Documentation Articles

Docs articles will be displayed in the table of contents in filename order.  You can prepend a number like `01-overview.md` to coerce the ordering.

There is a frontmatter item `weight` which used to be used for ordering but is now deprecated

## Redirects

Redirects are defined in `gatsby-node.js`.  The plugin `gatsby-plugin-netlify` generates pages for each redirect during build.

## Markdown Docs vs Markdown Pages

### Docs
For the `/docs` section of the site, all content lives in `/content/docs`, and can be markdown or MDX.  These are transformed into pages via `createPages()` in `gatsby-node.js`, which does all the fancy graphQL work to make the docs navigation (left sidebar) and contents (right sidebar).

### Pages
Most of the content in `/pages` is JSX, but you can mix in markdown files as well.  These are simply rendered and placed into a simple layout component (`src/layouts/markdown-page.js`).  There is no complex graphQL stuff, but the following frontmatter fields should exist so we can populate the title and head meta on these pages:

```
---
metaTitle: "Frequently Asked Questions"
metaDescription: "Frequently Asked Questions about Qri"
---
```

## the `.cache` directory

If you move around existing pages (such as moving a page down into a directory) you may have issues rebuilding in development.  You can safely delete the `.cache` directory, which will be rebuilt the next time you run `gatsby develop`


### Scripts

There are a few one-off scripts that programmatically generate content. They live in the `/scripts` directory. each one-off is a `.sh` script. Read the comments in each file for instructions on running, and what the script does.

### Jobs

To add a job listing, create a markdown file in `src/pages/jobs` with a filename that starts with `jobs-`.  This will be picked up by the graphql query in `src/pages/jobs/index` and will show up in the list.

If no markdown files match the query, a message saying there are no current openings is shown instead.

You can archive a job posting by changing its filename to not start with `jobs-`, for example: `archive-job-backend-software-engineer`.  Keeping these around will make it easier to turn them back on or adapt them for future positions.
