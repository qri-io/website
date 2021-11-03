// config for all the things
// docsSections defines the docs tree.  Items are either a path to a markdown file,
// or a group object with title, path, description, items
// top-level group objects also have colorClass
const docsSections = [
  {
    title: 'Tutorials',
    path: '/docs/tutorials',
    description: 'Welcome!  These tutorials are aimed at beginners and will break things down so you can get started quickly.',
    colorClass: 'text-qriorange-600',
    items: []
  },
  {
    title: 'Guides',
    path: '/docs/guides',
    description: 'These step-by-step guides will help you perform specific tasks. Refer to them when you need to do one thing well.',
    colorClass: 'text-qripink-600',
    items: [
      {
        title: 'Qri Transforms',
        path: '/docs/guides/transforms',
        description: 'These guides will cover various techniques for using Qri transforms to keep your datasets fresh',
        items: [
          '/docs/guides/transforms/scrape-data-from-a-website'
        ]
      },
      {
        title: 'Qri CLI',
        path: '/docs/guides/qri-cli',
        description: 'These guides will cover tasks you can perform with a local Qri repository and our Command Line Interface',
        items: [
          '/docs/guides/qri-cli/install-qri-cli',
          '/docs/guides/qri-cli/setup-your-local-qri-repository',
          '/docs/guides/qri-cli/create-a-dataset-from-a-csv',
          '/docs/guides/qri-cli/push-a-dataset-to-qri-cloud'
        ]
      }
    ]
  },
  {
    title: 'Concepts',
    path: '/docs/concepts',
    description: 'These docs will help explain Qri\'s core concepts and underlying technology',
    colorClass: 'text-qrigreen-600',
    items: [
      {
        title: 'Understanding Qri',
        path: '/docs/concepts/understanding-qri',
        description: 'This section provides detailed explanations of core Qri concepts',
        items: [
          '/docs/concepts/understanding-qri/what-is-qri',
          '/docs/concepts/understanding-qri/how-qri-defines-a-dataset',
          '/docs/concepts/understanding-qri/how-qri-version-control-works',
          '/docs/concepts/understanding-qri/how-qri-data-transforms-and-automation-work'
        ]
      },
      {
        title: 'Under the Hood',
        path: '/docs/concepts/under-the-hood',
        description: 'Dive deeper into underlying Qri concepts',
        items: [
          '/docs/concepts/under-the-hood/content-addressing',
          '/docs/concepts/under-the-hood/how-qri-uses-ipfs',
          '/docs/concepts/under-the-hood/why-starlark'
        ]
      }
    ]
  },
  {
    title: 'Reference',
    path: '/docs/reference',
    description: 'These technical reference docs will help you use Qri\'s APIs and write custom data transform scripts',
    colorClass: 'text-qrinavy-300',
    items: [
      {
        title: 'Starlark Language',
        path: '/docs/reference/starlark-language',
        description: 'Starlark is an untyped dynamic language with high-level data types, first-class functions with lexical scope, and automatic memory management or garbage collection.',
        items: [
          '/docs/reference/starlark-language/overview',
          '/docs/reference/starlark-language/lexical-elements',
          '/docs/reference/starlark-language/data-types',
          '/docs/reference/starlark-language/value-concepts',
          '/docs/reference/starlark-language/expressions',
          '/docs/reference/starlark-language/statements',
          '/docs/reference/starlark-language/built-in-constants-and-functions',
          {
            title: 'Built-in Methods',
            path: '/docs/reference/starlark-language/built-in-methods',
            description: 'Built-in methods for the Starlark data types',
            items: [
              '/docs/reference/starlark-language/built-in-methods/dict',
              '/docs/reference/starlark-language/built-in-methods/list',
              '/docs/reference/starlark-language/built-in-methods/set',
              '/docs/reference/starlark-language/built-in-methods/string'
            ]
          }
        ]
      },
      {
        title: 'Qri HTTP API',
        path: '/docs/reference/qri-http-api',
        description: 'You can interacto with qri.cloud or with your local qri node via HTTP requests',
        items: [
          '/docs/reference/qri-http-api/json-api-spec'
        ]
      },
      {
        title: 'Starlark Packages',
        path: '/docs/reference/starlark-packages',
        description: 'These packages extend Starlark\'s core functionality, and can be easily imported and used in your Qri transform scripts',
        items: [
          '/docs/reference/starlark-packages/overview',
          '/docs/reference/starlark-packages/bsoup',
          '/docs/reference/starlark-packages/dataframe',
          {
            title: 'compress',
            path: '/docs/reference/starlark-packages/compress',
            description: 'A set of Starlark packages for various types of compression/decompression',
            items: [
              '/docs/reference/starlark-packages/compress/gzip'
            ]
          },
          {
            title: 'encoding',
            path: '/docs/reference/starlark-packages/encoding',
            description: 'A set of Starlark packages for various types of encoding/decoding',
            items: [
              '/docs/reference/starlark-packages/encoding/base64',
              '/docs/reference/starlark-packages/encoding/csv',
              '/docs/reference/starlark-packages/encoding/json',
              '/docs/reference/starlark-packages/encoding/yaml'
            ]
          },
          '/docs/reference/starlark-packages/geo',
          '/docs/reference/starlark-packages/hash',
          '/docs/reference/starlark-packages/html',
          '/docs/reference/starlark-packages/http',
          '/docs/reference/starlark-packages/math',
          '/docs/reference/starlark-packages/re',
          '/docs/reference/starlark-packages/time',
          '/docs/reference/starlark-packages/xlsx',
          '/docs/reference/starlark-packages/zipfile'
        ]
      }
    ]
  }
  // {
  //   id: 'transform-snippets',
  //   text: 'Transform Snippets',
  //   link: '/docs/transform-snippets',
  //   subtitle: 'Automate your Datasets',
  //   description: 'These snippets of Starlark Code can help you learn the syntax and quickly use common patterns in your Qri workflows',
  //   colorClass: 'text-qrinavy-300'
  // }
]

const processSection = ({ title, path, items }) => {
  if (title && path) {
    flattenedGroups.push({
      title,
      path
    })
  }

  if (items) {
    items.forEach(processSection)
  }
}

// flatten groups in docsSections to allow for easier lookups for breacrumbs, etc
const flattenedGroups = []
docsSections.forEach(processSection)

// takes crumbs array from gatsby-plugin-breadcrumb
// replaces crumbLabel with descriptions from docsSections
const processCrumbs = (crumbs) => {
  const newCrumbs = crumbs.map((crumb) => {
    let newCrumbLabel = crumb.crumbLabel

    // capitalize docs
    if (crumb.crumbLabel === 'docs') {
      newCrumbLabel = 'Docs'
    }

    // for all others, lookup path
    const match = flattenedGroups.find(d => d.path === crumb.pathname)
    if (match) { newCrumbLabel = match.title }

    return {
      ...crumb,
      crumbLabel: newCrumbLabel
    }
  })

  return newCrumbs
}

const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://qri.io',
    gaTrackingId: null
  },
  header: {
    mainLinks: [
      {
        text: 'About',
        link: '/about'
      },
      {
        text: 'Datasets',
        link: 'https://qri.cloud'
      },
      {
        text: 'Documentation',
        link: '/docs'
      },
      {
        text: 'Blog',
        link: 'https://medium.com/qri-io'
      },
      {
        text: 'Jobs',
        link: 'https://jobs.lever.co/Qri'
      },
      {
        text: 'FAQ',
        link: '/docs/faq'
      }
    ],
    docsLinks: [
      ...docsSections.map((d) => ({
        text: d.title,
        link: d.path,
        colorClass: d.colorClass
      })),
      {
        text: 'FAQ',
        link: '/docs/faq'
      }
    ]
  },
  sidebar: {
    // modified from original config, this is now only for ordering top-level groups
    forcedNavOrder: [
      'getting-started',
      'dataset-components',
      'working-with-datasets',
      'integrating-qri',
      'reference'
    ],
    links: [
      // { "text": "", "link": ""},
    ],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: 'Qri.io',
    description: 'Qri Website and Documentation',
    ogImage: null,
    docsLocation: 'https://github.com/qri-io/website/blob/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg'
  },
  docsSections,
  processCrumbs
}

module.exports = config
