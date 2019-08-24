import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const GridTemplate = ({ content, sidebarLeft, sidebarRight }) => {
  return (
    <S.GridTemplate>
      <aside aria-hidden={!sidebarLeft}>{sidebarLeft}</aside>
      <S.GridContent>{content}</S.GridContent>
      <aside aria-hidden={!sidebarRight}>{sidebarRight}</aside>
    </S.GridTemplate>
  )
}

GridTemplate.propTypes = {
  content: PropTypes.node.isRequired
}

export default GridTemplate
