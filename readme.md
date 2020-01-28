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

### Ordering Documentation Articles

Docs articles will list in alphabetical order by default, but can be ordered manually by specifying a `weight` (number) property in the markdown frontmatter.  Lower weight will be given higher priority

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
