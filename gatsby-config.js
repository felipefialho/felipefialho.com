module.exports = {
  siteMetadata: {
    title: `Felipe Fialho`,
    position: 'Front-end Developer',
    author: `Felipe Fialho`,
    authorDescription: `I need to improve it later`,
    description: `I need to improve it later`,
    siteUrl: `https://felipefialho.com/`,
    social: {
      twitter: `felipefialho_`,
    },
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-svgr',
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Felipe Fialho Blog`,
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
