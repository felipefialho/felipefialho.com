const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          tags
        }
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
    indexName: `posts`,
    settings,
  },
]

module.exports = algoliaQueries
