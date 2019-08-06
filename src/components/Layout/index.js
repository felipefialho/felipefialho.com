import React from 'react'

import GlobalStyles from '../../styles/global'

import * as S from './styles'

const Layout = ({ children }) => {
  return (
    <S.Host>
      <GlobalStyles />
    </S.Host>
  )
}

export default Layout