import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import Content from 'components/Content';
import SEO from 'components/Seo';
import Social from 'components/Social';
import GridTemplate from 'components/GridTemplate';

const content = ({ site }) => {
  return (
    <article>
      <Social />
      <Content>
        <p><small><a href="/en" title="View in english">View in english</a></small></p>

        <h1>Eai... <span className="small" role="img" aria-label="Emoji mostrando a lingua">😜</span></h1>

        <p>{site.siteMetadata.description}</p>

        <p>Atualmente estou trabalhando no <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a> e sou criador da organização <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> no Github.</p>
      </Content>
    </article>
  )
}

const IndexPage = () => {
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
      <GridTemplate content={content({ site })} />
    </Layout>
  )
}

export default IndexPage
