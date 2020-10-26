import React from 'react'
import PropTypes from 'prop-types'

import { getActiveTheme } from 'utils/themes'

import * as S from './styled'

const Button = ({ children, to }) => {
  return (
    <S.Button
      to={to}
      cover
      direction="down"
      duration={1}
      bg={getActiveTheme()}>
      <span>{children}</span>
    </S.Button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.node.isRequired
}

export default Button

