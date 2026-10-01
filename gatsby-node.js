const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

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
    const postsPerPage = 10
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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` })
    createNodeField({
      node,
      name: `slug`,
      value: `blog/${slug.slice(12)}`
    })
  }
}

// Replaces gatsby-plugin-svgr, which is incompatible with webpack 5
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()
  const imagesRule = config.module.rules.find(
    rule => rule.test && rule.test.test && rule.test.test('.svg') && rule.type === 'asset/resource'
  )

  if (imagesRule) {
    imagesRule.test = /\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/
  }

  config.module.rules.push(
    {
      test: /\.svg$/,
      issuer: /\.(js|jsx|ts|tsx)$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.svg$/,
      issuer: { not: [/\.(js|jsx|ts|tsx)$/] },
      type: 'asset/resource',
    }
  )

  actions.replaceWebpackConfig(config)
}
