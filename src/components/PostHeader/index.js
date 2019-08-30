import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Tags'
import DateTime from 'components/DateTime'
import ButtonLink from 'components/ButtonLink'
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
      {image && (
        <R.GreaterThanTablet>
          <S.PostImage fluid={image.childImageSharp.fluid} />
        </R.GreaterThanTablet>
      )}
      <S.ButtonBack>
        <ButtonLink rel="prev" to="/blog/">
          ← Voltar na listagem
        </ButtonLink>
      </S.ButtonBack>
      <DateTime>
        {date}
        {timeToRead && (
          <span> · Leitura de {timeToRead} min</span>
        )}
      </DateTime>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{description}</S.Subtitle>
      <Tags tags={tags} isLink={true} />
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
