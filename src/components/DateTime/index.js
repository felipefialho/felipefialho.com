import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const DateTime = ({ children }) => {
  return (
    <S.DateTime>{children}</S.DateTime>
  )
}

DateTime.propTypes = {
  children: PropTypes.node.isRequired
}

export default DateTime
