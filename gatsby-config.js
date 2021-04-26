const path = require(`path`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const queries = require('./src/utils/algolia')

const feeds = [
  {
    serialize: ({ query: { site, allMarkdownRemark } }) => {
      return allMarkdownRemark.edges.map(edge => {
        const postUrl = path.join(site.siteMetadata.siteUrl, edge.node.fields.slug)
        return Object.assign({}, edge.node.frontmatter, {
          description: edge.node.frontmatter.description,
          date: edge.node.frontmatter.date,
          url: postUrl,
          guid: postUrl,
          custom_elements: [{ 'content:encoded': edge.node.excerpt }]
        })
      })
    },
    query: `
      {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                date
              }
              excerpt(truncate: true, pruneLength: 500, format: HTML)
            }
          }
        }
      }
    `,
    output: '/feed.xml',
    title: 'Felipe Fialho - RSS Feed'
  }
]

const plugins = [
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/assets`,
      name: 'uploads'
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/posts`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/lab`,
      name: `lab`,
    },
  },
  `gatsby-transformer-json`,
  'gatsby-plugin-resolve-src',
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-svgr`,
  `gatsby-plugin-transition-link`,
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-relative-images',
        },
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 650,
            linkImagesToOriginal: false
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: 'static/assets/'
          }
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            usePrefix: false,
            providers: {
              include: [
                'Youtube',
                'Twitter',
                'Codepen',
              ],
              exclude: [
                'Reddit',
                'Flickr',
                'Instagram'
              ]
            },
          },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-remark-lazy-load`,
        `gatsby-remark-prismjs`,
        `gatsby-remark-external-links`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds
    }
  },
  {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyDefault: 'pt-br',
      useLangKeyLayout: false
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Felipe Fialho`,
      short_name: `felipefialho.com`,
      start_url: `/`,
      background_color: `#fcfcfc`,
      theme_color: `#111111`,
      display: `minimal-ui`,
      icon: `content/assets/icon.png`,
    },
  },
  `gatsby-plugin-netlify-cms`,
  `gatsby-plugin-netlify`,
  {
    resolve: 'gatsby-plugin-netlify-cache',
    options: {
      cachePublic: true
    }
  },
]

if (process.env.CONTEXT === 'production') {
  const algolia = {
    resolve: `gatsby-plugin-algolia-search`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries,
      chunkSize: 10000, // default: 1000
      enablePartialUpdates: true
    }
  }

  const analytics = {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_ID,
      head: false
    }
  }

  plugins.push(algolia)
  plugins.push(analytics)
}

module.exports = {
  siteMetadata: {
    title: `Felipe Fialho - Front-end Developer`,
    author: `Felipe Fialho`,
    position: 'Front-end Developer',
    description: `Site pessoal e blog de um desenvolvedor Front-end apaixonado por criar coisas e compartilhar boas idéias.`,
    descriptionEn: `Personal website of a Front End developer passionate about create things and sharing good ideas.`,
    siteUrl: `https://felipefialho.com/`,
    social: {
      twitter: `felipefialho_`,
      twitterLink: `https://twitter.com/felipefialho_`,
      linkedinLink: `https://www.linkedin.com/in/felipefialho/`,
      githubLink: `https://github.com/felipefialho`,
      youtubeLink: `https://www.youtube.com/c/FelipeFialhoDev`,
    },
  },
  plugins
}
