const indexName = 'Docs'
const pageQuery = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath:  {regex: "\\/docs/"},
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          metaTitle
          metaDescription
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`
function pageToAlgoliaRecord ({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest
  }
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: ['excerpt:20'] }
  }
]
module.exports = queries
