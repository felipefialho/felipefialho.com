import React from 'react'
import ReactGA from 'react-ga'

import ButtonLink from 'components/ButtonLink'
import Layout from 'components/Layout'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'
import Author from 'components/Author'

const trackLanguageClick = () => {
  ReactGA.event({
    category: 'About',
    action: 'click',
    label: `About - Go to english`
  })
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Um pouco de mim' />
      <GridTemplate>
        <ButtonLink
          to="/en/hi/"
          title="View in english"
          onClick={() => trackLanguageClick()}>
            View in english
        </ButtonLink>

        <Author fullText={true} />
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
