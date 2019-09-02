import React from 'react'
import ReactGA from 'react-ga'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'
import ButtonLink from 'components/ButtonLink'
import Author from 'components/Author'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'Home',
    action: 'click',
    label: `Home - Go to portuguese`
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
      <SEO lang="en" title='Home' description={site.siteMetadata.descriptionEn} />
      <GridTemplate>
        <ButtonLink
          to="/"
          title="View in english"
          onClick={() => trackLanguageClick()}>
            Ver em português
        </ButtonLink>

        <Author language="en" />
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
