import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'
import Menu from 'components/Menu'
import Container from 'components/Container'
import LightButton from 'components/LightButton'

import * as R from '../Responsive'
import * as S from './styled'

const Header = ({ site: { author }}) => {
  return (
    <S.Header>
      <Container>
        <S.Main> 
          <S.Brand>
            <Avatar />
            <R.Tablet>
              <S.Title>{ author }</S.Title>
            </R.Tablet>
          </S.Brand>
          <Menu />
          <R.Tablet>
            <LightButton />
          </R.Tablet>
        </S.Main>
      </Container>
      <R.Mobile>
        <S.Bar>
          <p>{ author }</p>
          <LightButton />
        </S.Bar>
      </R.Mobile>
    </S.Header>
  )
}

Header.propTypes = {
  site: PropTypes.shape({
    author: PropTypes.string.isRequired
  })
}

export default Header