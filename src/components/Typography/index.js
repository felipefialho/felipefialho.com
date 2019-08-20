import React from 'react'

import { getActiveTheme } from 'utils'

import * as S from './styled'

export const Date = ({ children }) => {
  return (
    <S.Date>
      { children }
    </S.Date>
  )
}

export const Link = ({
  children,
  to
}) => {
  return (
    <S.Link to={to} cover direction="bottom" bg={getActiveTheme()}>
      { children }
    </S.Link>
  )
}
