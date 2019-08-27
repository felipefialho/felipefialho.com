import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const GridTemplate = ({ children }) => {
  return (
    <S.GridTemplate>
      {children}
    </S.GridTemplate>
  )
}

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default GridTemplate
