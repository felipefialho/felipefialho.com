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
    label: `About - Go to english`
  })
}

const IndexPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            authorDescription
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO title={site.siteMetadata.title} />
      <GridTemplate>
        <ButtonLink
          to="/en/hi/"
          title="View in english"
          onClick={trackLanguageClick()}>
            View in english
        </ButtonLink>

        <Social />

        <Content>
          <h1>Olá!</h1>

          <p>{site.siteMetadata.authorDescription}</p>

          <p>Sou apaixonado por futebol, seja assistindo, seja jogando, como dizem "futebol é a coisa mais importante entre as menos importantes". Também gosto de cerveja e música, especialmente os dois juntos. No tempo livre curto assistir filmes e séries, eventualmente ler livros e filosofar sobre a vida.</p>

          <p>Atualmente estou trabalhando no <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a>. Sou criador da organização <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> no Github. Também sou um dos fundadores do Meetup CSS e ajudei a organizar a Conferencia CSS Brasil em 2015.</p>

          <p>Nos últimos anos desenvolvi um monte de projetos open-source, como:</p>

          <ul>
            <li><a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver Front-end BR">Front-end BR</a></li>
            <li><a href="https://github.com/felipefialho/css-components" target="_blank" rel="noopener noreferrer" title="Ver CSS Components">CSS Components</a></li>
            <li><a href="https://github.com/felipefialho/frontend-challenges" target="_blank" rel="noopener noreferrer" title="Ver Front-end Challenges">Front-end Challenges</a></li>
            <li><a href="https://github.com/felipefialho/kratos-boilerplate" target="_blank" rel="noopener noreferrer" title="Ver Kratos Boilerplate">Kratos Boilerplate</a></li>
            <li><a href="https://github.com/felipefialho/piano" target="_blank" rel="noopener noreferrer" title="Ver Piano">Piano</a></li>
            <li><a href="https://github.com/felipefialho/despolitizador" target="_blank" rel="noopener noreferrer" title="Ver Despolitizador">Despolitizador</a></li>
            <li><a href="https://survey.frontendbr.com.br" target="_blank" rel="noopener noreferrer" title="Ver Survey">Survey</a></li>
          </ul>
        </Content>
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
