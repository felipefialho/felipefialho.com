import React from 'react'
import PropTypes from 'prop-types'

import { getActiveTheme } from 'utils'

import * as S from './styled'

const ButtonLink = ({ children, to }) => {
  return (
    <S.ButtonLink to={to} cover direction="bottom" bg={getActiveTheme()}>
      { children }
    </S.ButtonLink>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.node.isRequired
}

export default ButtonLink

