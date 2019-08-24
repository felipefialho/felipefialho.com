import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const GridTemplate = ({ content, sidebar }) => {
  return (
    <S.GridTemplate>
      <aside aria-hidden={!sidebar}>{sidebar}</aside>
      <S.GridContent>{content}</S.GridContent>
    </S.GridTemplate>
  )
}

GridTemplate.propTypes = {
  content: PropTypes.node.isRequired
}

export default GridTemplate
