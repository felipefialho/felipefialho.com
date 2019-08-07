import React from 'react'
import Helmet from 'react-helmet'

import GlobalStyles from '../../styles/global'

import * as S from './styles'

const Layout = ({ children }) => {
  return (
    <S.Host>
      <Helmet>
        <body className="theme--dark" />
      </Helmet>
      <GlobalStyles />
      <p>It works</p>
    </S.Host>
  )
}

export default Layout