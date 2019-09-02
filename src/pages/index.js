import React from 'react'
import ReactGA from 'react-ga'

import ButtonLink from 'components/ButtonLink'
import Layout from 'components/Layout'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'
import BlogList from 'components/BlogList'
import Author from 'components/Author'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'Home',
    action: 'click',
    label: `Home - Go to english`
  })
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Home' />
      <GridTemplate>
        <ButtonLink
          to="/en/"
          title="View in english"
          onClick={() => trackLanguageClick()}>
          View in english
        </ButtonLink>

        <Author />
        <BlogList />
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
