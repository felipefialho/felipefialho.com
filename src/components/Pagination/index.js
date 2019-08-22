import React from 'react'
import PropTypes from 'prop-types'

import ButtonLink from 'components/ButtonLink'

import * as S from './styled'

const Pagination = ({
  isFirst,
  isLast,
  nextPage,
  prevPage,
  currentPage,
  numPages
}) => (
  <S.Pagination>
    {!isFirst && (
      <ButtonLink rel="prev" to={prevPage}>
        ← Anterior
      </ButtonLink>
    )}
    <span>{currentPage} de {numPages}</span>
    {!isLast && (
      <ButtonLink rel="next" to={nextPage}>
        Próxima →
      </ButtonLink>
    )}
  </S.Pagination>
)

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  prevPage: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
