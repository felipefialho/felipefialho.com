const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/content/posts/" } }
  ) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
          description
          title
          tags
        }
        timeToRead
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr => {
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
}

const settings = { attributesToSnippet: [`excerpt: 20`] }

const algoliaQueries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = algoliaQueries
