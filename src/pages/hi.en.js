import React from 'react'
import ReactGA from 'react-ga'
import { useStaticQuery, graphql } from 'gatsby'

import ButtonLink from 'components/ButtonLink'
import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import Social from 'components/Social'
import GridTemplate from 'components/GridTemplate'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'About',
    action: 'click',
    label: `About - Go to portuguese`
  })
}

const IndexPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            descriptionEn
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO lang="en" title={site.siteMetadata.title} description={site.siteMetadata.descriptionEn} />
      <GridTemplate>
        <ButtonLink
          to="/"
          title="View in english"
          onClick={trackLanguageClick()}>
            Ver em português
        </ButtonLink>

        <Social />

        <Content>
          <h1>Hi!</h1>

          <p>{site.siteMetadata.descriptionEn}</p>

          <p>Currently, I'm a Developer at <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a> and
          I've created the <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> organization on Github. I'm also a founder of Meetup CSS and I helped in organization of
          Conferência CSS Brasil 2015.</p>

          <p>I've been creating a lot of open-source projects in
          the last years, like:</p>

          <ul>
            <li><a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="View Front-end BR">Front-end BR</a></li>
            <li><a href="https://github.com/felipefialho/css-components" target="_blank" rel="noopener noreferrer" title="View CSS Components">CSS Components</a></li>
            <li><a href="https://github.com/felipefialho/frontend-challenges" target="_blank" rel="noopener noreferrer" title="View Front-end Challenges">Front-end Challenges</a></li>
            <li><a href="https://github.com/felipefialho/kratos-boilerplate" target="_blank" rel="noopener noreferrer" title="View Kratos Boilerplate">Kratos Boilerplate</a></li>
            <li><a href="https://github.com/felipefialho/piano" target="_blank" rel="noopener noreferrer" title="View Piano">Piano</a></li>
            <li><a href="https://github.com/felipefialho/despolitizador" target="_blank" rel="noopener noreferrer" title="View Despolitizador">Despolitizador</a></li>
            <li><a href="https://survey.frontendbr.com.br" target="_blank" rel="noopener noreferrer" title="View Survey">Survey</a></li>
          </ul>
        </Content>
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
