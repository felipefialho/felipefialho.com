import React from 'react'
import PropTypes from 'prop-types'

import { getActiveTheme } from 'utils/themes'

import * as S from './styled'

const ButtonLink = ({ children, to }) => {
  return (
    <S.ButtonLink
      to={to}
      cover
      direction="down"
      duration={1}
      bg={getActiveTheme()}>
      { children }
    </S.ButtonLink>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.node.isRequired
}

export default ButtonLink

