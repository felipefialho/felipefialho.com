import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const Content = ({ children }) => {
  return (
    <S.Content>{ children }</S.Content>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired
}

export default Content