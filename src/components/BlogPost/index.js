import React from 'react'
import PropTypes from 'prop-types'

import { getActiveTheme } from 'utils'
import { Date } from 'components/Typography'

import * as S from './styled'

const BlogPost = ({
  slug,
  date,
  title,
  description
}) => {
  return (
    <S.BlogPost to={slug} cover direction="bottom" bg={getActiveTheme()}>
      <Date>{date}</Date>
      <S.Title>{title}</S.Title>
      <p>{description}</p>
    </S.BlogPost>
  )
}

BlogPost.propTypes = {
  slug: PropTypes.node.isRequired,
  date: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired
}

export default BlogPost
