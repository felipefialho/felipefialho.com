import React from 'react'
import ReactGA from 'react-ga'
import { useStaticQuery, graphql } from 'gatsby'

import ButtonLink from 'components/ButtonLink'
import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import Social from 'components/Social'
import GridTemplate from 'components/GridTemplate'
import BlogList from 'components/BlogList'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'Home',
    action: 'click',
    label: `Home - Go to english`
  })
}

const blogListQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            description
            title
          }
        }
      }
    }
  }
`

const content = ({ site, allBlogList }) => {
  return (
    <article>
      <Social />
      <ButtonLink to="/en" title="View in english" onClick={trackLanguageClick()}>
        View in english
      </ButtonLink>
      <Content>
        <h1>Eai... <span className="small" role="img" aria-label="Emoji mostrando a lingua">😜</span></h1>

        <p>{site.siteMetadata.description}</p>

        <p>Atualmente estou trabalhando no <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a> e sou criador da organização <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> no Github.</p>
      </Content>
      <BlogList list={allBlogList.allMarkdownRemark.edges} />
    </article>
  )
}

const IndexPage = () => {
  const allBlogList = useStaticQuery(blogListQuery)

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO title={site.siteMetadata.title} />
      <GridTemplate content={content({ site, allBlogList })} />
    </Layout>
  )
}

export default IndexPage
