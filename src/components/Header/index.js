import React from 'react'

import Avatar from '../Avatar';

import * as S from './styled'

const Header = ({ children }) => {
  return (
    <S.Host>
      <Avatar />
    </S.Host>
  )
}

export default Header