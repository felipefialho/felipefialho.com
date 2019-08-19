import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const GridTemplate = ({ content, aside }) => {
  return (
    <S.GridTemplate>
      <aside aria-hidden={!aside}>{aside}</aside>
      {content}
    </S.GridTemplate>
  )
}

GridTemplate.propTypes = {
  content: PropTypes.node.isRequired
}

export default GridTemplate
