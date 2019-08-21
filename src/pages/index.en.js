import React from 'react'
import ReactGA from 'react-ga'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import Social from 'components/Social'
import GridTemplate from 'components/GridTemplate'
import ButtonLink from 'components/ButtonLink'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'Home',
    action: 'click',
    label: `Home - Go to portuguese`
  })
}

const content = ({ site }) => {
  return (
    <article>
      <Social />
      <ButtonLink to="/" title="View in english" onClick={trackLanguageClick()}>
        Ver em português
      </ButtonLink>
      <Content>
        <h1>Hi... <span className="small" role="img" aria-label="Emoji showing tongue">😜</span></h1>

        <p>{site.siteMetadata.descriptionEn}</p>

        <p>Currently, I'm a Developer at <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a> and
        I've created the <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> organization on Github.</p>
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
            descriptionEn
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO lang="en" title={site.siteMetadata.title} description={site.siteMetadata.descriptionEn} />
      <GridTemplate content={content({ site })} />
    </Layout>
  )
}

export default IndexPage
