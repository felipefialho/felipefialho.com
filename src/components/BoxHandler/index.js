import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const BoxHandler = ({ children }) => {
  return (
    <S.BoxHandler>{children}</S.BoxHandler>
  )
}

BoxHandler.propTypes = {
  children: PropTypes.node.isRequired
}

export default BoxHandler
