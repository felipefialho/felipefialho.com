import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Tags'
import DateTime from 'components/DateTime'
import * as R from 'components/Responsive'

import * as S from './styled'

const PostHeader = ({ 
  image, 
  tags, 
  date, 
  timeToRead, 
  title, 
  description 
}) => {
  return (
    <S.PostHeader>
      <R.GreaterThanTablet>
        <S.PostImage fluid={image.childImageSharp.fluid} />
      </R.GreaterThanTablet>
      <DateTime>
        {date}
        {timeToRead && (
          <span> · Leitura de {timeToRead} min</span>
        )}
      </DateTime>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{description}</S.Subtitle>
      <Tags tags={tags} />
    </S.PostHeader>
  )
}

PostHeader.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.node.isRequired,
}

export default PostHeader
