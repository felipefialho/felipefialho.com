import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../Avatar';

import * as S from './styled'

const Header = ({ site: { author }}) => {
  return (
    <S.Header>
      <S.Main>
        <S.Brand>
          <Avatar />
          <S.Title>{ author }</S.Title>
        </S.Brand>
      </S.Main>
      <S.Bar>{ author }</S.Bar>
    </S.Header>
  )
}

Header.propTypes = {
  site: PropTypes.shape({
    author: PropTypes.string.isRequired
  })
}

export default Header