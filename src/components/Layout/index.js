import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { TransitionPortal } from 'gatsby-plugin-transition-link'

import GlobalStyles from '../../styles/global'
import Header from '../Header';
import Container from '../Container';

import * as S from './styled'

const Layout = ({ children }) => {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            position
            description
            authorDescription
          }
        }
      }
    `
  )

  return (
    <S.Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <body className="theme--light" />
      </Helmet>
      <GlobalStyles />
      <TransitionPortal>
        <Header site={site.siteMetadata} />
      </TransitionPortal>
      <S.Main>
        <Container children={children}></Container>
      </S.Main>
    </S.Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout