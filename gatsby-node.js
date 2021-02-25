const path = require('path')
const fetch = require('node-fetch')
const startCase = require('lodash.startcase')

// [ fromPath, toPath ]
const redirects = [
  ['/odw2021', 'https://us02web.zoom.us/meeting/register/tZwuf-mvqjojGNfpfgJmRTH1KQ3uC3kniOBE'],
  ['/ODW2021', 'https://us02web.zoom.us/meeting/register/tZwuf-mvqjojGNfpfgJmRTH1KQ3uC3kniOBE'],
  ['/blog', 'https://medium.com/qri-io'],
  ['/blog/a_better_mousetrap_podcast/', 'https://medium.com/qri-io/a-better-mousetrap-podcast-6cd068aba347'],
  ['/blog/datasets_are_books/', 'https://medium.com/qri-io/datasets-are-books-not-houses-760bd4736229'],
  ['/blog/introducing_qri/', 'https://medium.com/qri-io/introducing-qri-3b0e7fb470da'],
  ['/blog/mlb_homeruns/', 'https://medium.com/qri-io/leave-the-munging-to-the-machines-mlb-edition-9c23c82b4867'],
  ['/blog/qri_out_and_about/', 'https://medium.com/qri-io/qri-oot-and-aboot-7d5f5c591908'],
  ['/blog/unit_test_performance/', 'https://medium.com/qri-io'],
  ['/blog/*', 'https://medium.com/qri-io'],

  ['/desktop', '/download'],
  ['/desktop/getting-started', '/docs/getting-started/qri-desktop-quickstart'],

  ['/docs/concepts/content-addressing', '/docs/reference/content-addressing'],
  ['/docs/concepts/dataset', '/docs/dataset-components/overview'],
  ['/docs/concepts/ipfs_to_qri', '/docs/reference/ipfs_to_qri'],
  ['/docs/concepts/overview', '/docs/getting-started/what-is-qri'],
  ['/docs/concepts/*', '/docs'],
  ['/docs/concepts', '/docs'],
  ['/docs/starlark/introduction', '/docs/transforms/overview'],
  ['/docs/starlark/starlib', '/docs/transforms/starlib'],
  ['/docs/starlark/examples', '/docs/transforms/examples'],
  ['/docs/starlark/runtime', '/docs/transforms/runtime'],
  ['/docs/tutorials/cli-quickstart', '/docs/getting-started/qri-cli-quickstart'],
  ['/docs/tutorials/*', '/docs'],
  ['/docs/tutorials', '/docs'],
  ['/docs/reference/dataset-specification/', '/docs/reference/dataset'],
  ['/docs/reference/starlark_syntax', '/docs/starlark/runtime'],
  ['/docs/reference/starlark_examples', '/docs/starlark/examples'],
  ['/docs/reference/starlib', '/docs/starlark/starlib'],
  ['/docs/reference', '/docs'],
  ['/docs/workflows', '/docs'],

  ['/papers/deterministic_querying', '/deterministic-querying'],

  ['/install.sh', 'https://raw.githubusercontent.com/qri-io/qri_install/master/install.sh']
]

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // redirects
  redirects.forEach(([fromPath, toPath]) => {
    createRedirect({
      fromPath,
      toPath
    })
  })

  return new Promise((resolve, reject) => {
    resolve(
      // graphql query to get mdx in the 'docs' souce instance
      // loose mdx files in /pages will be handled by gatsby's default page creation
      graphql(
        `
          {
            allMdx(filter: {fileAbsolutePath: {regex: "\\/docs/"}}) {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        // Create docs pages
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: path.resolve('./src/layouts/docs.js'),
            context: {
              id: node.fields.id,
              layout: 'docs'
            }
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble' // to reduce bundle size
      }
    }
  }

  if (stage === 'build-html' || stage === 'develop-html') {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null()
        }
      ]
    }
  }

  actions.setWebpackConfig(config)
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from'
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    let value = parent.relativePath.replace(parent.ext, '')

    if (value === 'index') {
      value = ''
    }

    createNodeField({
      name: 'slug',
      node,
      value: `/${value}`
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.metaTitle || startCase(parent.name)
    })

    createNodeField({
      name: 'weight',
      node,
      value: node.frontmatter.weight
    })

    // make additional frontmatter fields for jobs
    if (node.fileAbsolutePath.match(/jobs\/job-/)) {
      createNodeField({
        name: 'jobTitle',
        node,
        value: node.frontmatter.jobTitle
      })

      createNodeField({
        name: 'jobLocation',
        node,
        value: node.frontmatter.jobLocation
      })
    }

    // make additional frontmatter fields for data stories
    if (node.fileAbsolutePath.match(/data-stories/)) {
      createNodeField({
        name: 'subtitle',
        node,
        value: node.frontmatter.subtitle
      })

      createNodeField({
        name: 'by',
        node,
        value: node.frontmatter.by
      })

      createNodeField({
        name: 'date',
        node,
        value: node.frontmatter.date
      })

      createNodeField({
        name: 'heroImage',
        node,
        value: node.frontmatter.heroImage
      })
    }
  }
}

// defines types for jobs frontmatter.  When there are no jobs markdown pages,
// this makes sure there is no error when rendering jobs/index
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MdxFields implements Node {
      jobTitle: String
      jobLocation: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  // get data from qri cloud at build time to populate featured datasets
  const result = await fetch('https://registry.qri.cloud/dataset_summary/splash')
  const resultData = await result.json()

  const featuredDatasets = resultData.data.featured

  featuredDatasets.forEach((dataset) => {
    // hack, leaving this a number causes createNode() to fail with a heap error
    dataset.structure.length = dataset.structure.length.toString()

    createNode({
      id: `${dataset.peername}/${dataset.name}`,
      parent: null,
      children: [],
      internal: {
        type: 'featured',
        contentDigest: createContentDigest(dataset)
      },
      ...dataset
    })
  })
}
