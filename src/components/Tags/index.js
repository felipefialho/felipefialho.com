import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const Tags = ({ tags }) => {
  return (
    <S.Tags>
      <S.TagIcon />
      {tags.map((tag, i) => (
        <S.TagItem key={i}>{tag}</S.TagItem>
      ))}
    </S.Tags>
  )
}

Tags.propTypes = {
  tags: PropTypes.node.isRequired
}

export default Tags
