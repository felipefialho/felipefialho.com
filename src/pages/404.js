import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { getActiveTheme } from 'utils/themes'

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

const trackBlogClick = () => {
  ReactGA.event({
    category: '404',
    action: 'click',
    label: `404 - Go to blog`
  })
}

const content = () => {
  return (
    <section>
      <Social />
      <Content>
        <h1>Não tem nada aqui... <span 
          className="small" 
          role="img" 
          aria-label="Emoji assustado">😱</span>
        </h1>

        <h2>Mas não se preocupe! <span 
          className="small" 
          role="img" 
          aria-label="Emoji feliz">😄</span>
        </h2>

        <p>Enquanto isso você pode dar uma olhadinha nos meus <AniLink
          cover
          bg={getActiveTheme()}
          duration={.6}
          direction="down"
          to="/lab/"
          onClick={trackLabsClick()}>
          projetos pessoais
        </AniLink> ou <AniLink
          cover
          bg={getActiveTheme()}
          duration={.6}
          direction="down"
          to="/blog/"
          onClick={trackBlogClick()}>
          ler meu blog
        </AniLink>! <span 
          className="small" 
          role="img" 
          aria-label="Emoji com olhos apaixonados">😍
        </span></p>
      </Content>
    </section>
  )
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Página não encontrada" />
      <GridTemplate content={content()} />
    </Layout>
  )
}

export default IndexPage
