module.exports = {
  siteMetadata: {
    title: `Felipe Fialho - Front-end Developer`,
    author: `Felipe Fialho`,
    position: 'Front-end Developer',
    authorDescription: `Trabalho como Desenvolvedor Front-end desde 2009. Sou apaixonado por projetos open-source, acredito que a disseminação de conhecimento e boas idéias inspira e melhora o mundo.`,
    description: `Trabalho como Desenvolvedor Front-end desde 2009. Sou apaixonado por projetos open-source, acredito que disseminação de conhecimento e boas idéias inspira e melhora o mundo.`,
    descriptionEn: `I've been working as Front-End
    Developer since 2009. I'm passionate about open source projects, I believe that the dissemination of knowledge and good ideas inspires and improves the world.`,
    siteUrl: `https://felipefialho.com/`,
    social: {
      twitter: `felipefialho_`,
      twitterLink: `https://twitter.com/felipefialho_`,
      linkedinLink: `https://www.linkedin.com/in/felipefialho/`,
      githubLink: `https://github.com/felipefialho`,
      codepenLink: `https://codepen.io/felipefialho`,
      mediumLink: `https://medium.com/@felipefialho`,
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-resolve-src',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-svgr`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `felipefialho`
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-40410936-1',
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
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/lab`,
        name: `lab`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
            },
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
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Felipe Fialho`,
        short_name: `felipefialho.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#111111`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        options: require('./src/utils/algolia'),
        chunkSize: 10000, // default: 1000
      },
    },
  ],
}
