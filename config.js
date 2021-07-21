// config for all the things
const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://qri.io',
    gaTrackingId: null
  },
  header: {
    logo: '/img/new-docs/logo.svg',
    logoLink: '/',
    title: 'qri',
    links: [
      {
        text: 'Tutorials',
        link: '/docs/tutorials',
        iconColorClass: 'text-qriorange-600'
      },
      {
        text: 'Guides',
        link: '/docs/guides',
        iconColorClass: 'text-qripink-600'
      },
      {
        text: 'Concepts ',
        link: '/docs/concepts',
        iconColorClass: 'text-qrigreen-600'
      },
      {
        text: 'Reference',
        link: '/docs/reference',
        iconColorClass: 'text-qrinavy-300'
      },
      {
        text: 'Transform Snippets',
        link: '/docs/transform-snippets'
      },
      {
        text: 'FAQ',
        link: '/docs/faq'
      }
    ],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY
    }
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
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
}

module.exports = config
