import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { getActiveTheme } from 'utils'

import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import Social from 'components/Social'
import GridTemplate from 'components/GridTemplate'

const trackLabsClick = () => {
  ReactGA.event({
    category: '404',
    action: 'click',
    label: `404 - Go to labs`
  })
}

const content = () => {
  return (
    <section>
      <Social />
      <Content>
        <h1>There's nothing here... <span 
          className="small" 
          role="img" 
          aria-label="Scared emoji">😱</span>
        </h1>

        <h2>But don't worry! <span 
          className="small" 
          role="img" 
          aria-label="Happy emoji">😄</span>
        </h2>

        <p>In the meantime you can take a look at my <AniLink
          cover
          bg={getActiveTheme()}
          duration={.6}
          direction="down"
          to="/lab/"
          onClick={trackLabsClick()}>
          personal projects
        </AniLink>! <span 
          className="small" 
          role="img" 
          aria-label="Passionate eyes emoji">😍
        </span></p>
      </Content>
    </section>
  )
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Page not found" />
      <GridTemplate content={content()} />
    </Layout>
  )
}

export default IndexPage
