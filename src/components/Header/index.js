import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../Avatar';

import * as S from './styled'

const Header = ({ site: { title }}) => {
  return (
    <S.Header>
      <S.Main>
        <S.Brand>
          <Avatar />
          <S.Title>{ title }</S.Title>
        </S.Brand>
      </S.Main>
      <S.Bar>{ title }</S.Bar>
    </S.Header>
  )
}

Header.propTypes = {
  site: PropTypes.shape({
    title: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    authorDescription: PropTypes.string.isRequired
  })
}

export default Header