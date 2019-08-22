import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Tags'
import DateTime from 'components/DateTime'
import * as R from 'components/Responsive'

import * as S from './styled'

const BlogHeader = ({ image, tags, date, timeToRead, title, description }) => {
  return (
    <S.BlogHeader>
      <R.GreaterThanTablet>
        <S.BlogHeaderImage fluid={image.childImageSharp.fluid} />
      </R.GreaterThanTablet>
      <Tags tags={tags} />
      <DateTime>
        {date}
        {timeToRead && (
          <span> · Leitura de {timeToRead} min</span>
        )}
      </DateTime>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{description}</S.Subtitle>
    </S.BlogHeader>
  )
}

BlogHeader.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.node.isRequired,
}

export default BlogHeader
