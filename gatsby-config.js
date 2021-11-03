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
  'gatsby-plugin-layout',
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
        pages: require.resolve('./src/components/markdown-page.js')
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
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            icon: false
          }
        }
      ],
      extensions: ['.mdx', '.md']
    }
  },
  'gatsby-plugin-catch-links',
  {
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries: require('./src/utils/algolia-queries')
    }
  },
  {
    resolve: 'gatsby-plugin-breadcrumb',
    options: {
      useAutoGen: true
    }
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Qri.io',
      short_name: 'Qri.io',
      icons: [{
        src: 'google-touch-icon.png',
        sizes: '512x512'
      }],
      background_color: '#ffffff',
      theme_color: '#ffffff',
      display: 'fullscreen'
    }

  }
]

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
    siteUrl: config.gatsby.siteUrl
  },
  plugins: plugins
}
