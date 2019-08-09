import React from 'react'

import Avatar from '../Avatar';
import Brand from '../Brand';

import * as S from './styled'

const Header = ({ children }) => {
  return (
    <S.Header>
      <S.Brand>
        <Avatar />
        <Brand />
      </S.Brand>
    </S.Header>
  )
}

export default Header