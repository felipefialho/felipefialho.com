module.exports = {
  siteMetadata: {
    title: `Felipe Fialho - Front-end Developer`,
    author: `Felipe Fialho`,
    position: 'Front-end Developer',
    authorDescription: `Trabalho como Front-end Developer desde 2009. Sou apaixonado por projetos open-source, acredito que a disseminação de conhecimento e boas idéias inspira e melhora o mundo.`,
    description: `Apenas mais um site sobre Desenvolvimento Front-end`,
    siteUrl: `https://felipefialho.com/`,
    social: {
      twitter: `felipefialho_`,
      linkedin: `felipefialho`,
      github: `felipefialho`,
    },
  },
  plugins: [
    'gatsby-plugin-resolve-src',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-svgr`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-40410936-1',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Felipe Fialho`,
        short_name: `felipefialho.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#111111`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ],
}
