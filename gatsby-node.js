const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: `blog${slug}`
    })
  }
}

// To create the posts pages
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  return graphql(
    `{
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
              description
              title
              tags
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) throw result.errors

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: blogPost,
        context: {
          slug: node.fields.slug,
          // the order is different here because of the DESC order
          previous: next,
          next: previous
        }
      })
    })

    // Create blog post list pages
    const postsPerPage = 30
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/` : `/blog/page/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    })
  })
}
