import React from 'react'
import PropTypes from 'prop-types'

import { getActiveTheme } from 'utils'

import * as S from './styled'

const BlogPost = ({ 
  slug, 
  date, 
  title, 
  description 
}) => {
  return (
    <S.BlogPost to={slug} cover direction="bottom" bg={getActiveTheme()}>
      <time>{date}</time>
      <h1>{title}</h1>
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
