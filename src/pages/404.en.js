import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { getActiveTheme } from 'utils/themes'

import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'

const trackLabsClick = () => {
  ReactGA.event({
    category: '404',
    action: 'click',
    label: `404 - Go to labs`,
  })
}

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title='Page not found' />
      <GridTemplate>
        <Content>
          <h1>
            There's nothing here...
            <span className='small' role='img' aria-label='Scared emoji'>
              😱
            </span>
          </h1>

          <p className='support-title'>
            But don't worry!
            <span className='small' role='img' aria-label='Happy emoji'>
              😄
            </span>
          </p>

          <p>
            In the meantime you can take a look at my{' '}
            <AniLink
              cover
              bg={getActiveTheme()}
              direction='down'
              duration={1}
              to='/lab/'
              onClick={() => trackLabsClick()}
            >
              personal projects
            </AniLink>
            !{' '}
            <span
              className='small'
              role='img'
              aria-label='Passionate eyes emoji'
            >
              😍
            </span>
          </p>
        </Content>
      </GridTemplate>
    </Layout>
  )
}

export default NotFoundPage
