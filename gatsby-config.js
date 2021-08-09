require('dotenv').config()
const config = require('./config')
const plugins = [
  {
    resolve: 'gatsby-plugin-eslint',
    options: {
      stages: ['develop'],
      extensions: ['js', 'jsx'],
      exclude: ['node_modules', '.cache', 'public']
    }
  },
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      postCssPlugins: [
        require('tailwindcss'),
        require('./tailwind.config.js')
      ]
    }
  },
  'gatsby-plugin-netlify',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-plugin-layout',
    options: {
      component: require.resolve('./src/layouts/index.js')
    }
  },
  'gatsby-plugin-emotion',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      defaultLayouts: {
        pages: require.resolve('./src/layouts/markdown-page.js')
      },
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true
          }
        },
        {
          resolve: 'gatsby-remark-copy-linked-files'
        },
        {
          resolve: 'gatsby-remark-autolink-headers'
        }
      ],
      extensions: ['.mdx', '.md']
    }
  },
  {
    resolve: 'gatsby-plugin-gtag',
    options: {
      // your google analytics tracking id
      trackingId: config.gatsby.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false
    }
  },
  'gatsby-plugin-catch-links',
  {
    resolve: 'gatsby-plugin-segment-analytics',
    options: {
      writeKey: 'b4iAxJT8ISitRFQ6qZGS9w7RTnaOpvju'
    }
  }
  // {
  //   resolve: 'gatsby-plugin-algolia',
  //   options: {
  //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
  //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
  //     queries: require('./src/utils/algolia-queries')
  //   }
  // }
]

// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: 'gatsby-plugin-manifest',
    options: { ...config.pwa.manifest }
  })
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve('./src/custom-sw-code.js')
    }
  })
} else {
  plugins.push('gatsby-plugin-remove-serviceworker')
}
module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: { link: config.header.logoLink ? config.header.logoLink : '/', image: config.header.logo }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    mainHeaderLinks: config.header.mainLinks,
    docsHeaderLinks: config.header.docsLinks,
    siteUrl: config.gatsby.siteUrl,
    docsSections: config.docsSections
  },
  plugins: plugins
}
