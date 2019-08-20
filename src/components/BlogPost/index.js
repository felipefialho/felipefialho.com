import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { getActiveTheme } from 'utils'
import { Date } from 'components/Typography'

import * as S from './styled'

const trackClick = (item) => {
  ReactGA.event({
    category: 'Blog',
    action: 'click',
    label: `Blog List - Go to ${item}`
  })
}

const BlogPost = ({
  slug,
  date,
  title,
  description
}) => {
  return (
    <S.BlogPost
      to={slug}
      cover
      direction="bottom"
      bg={getActiveTheme()}
      onClick={trackClick(title)}>
        <article>
          <Date>{date}</Date>
          <S.Title>{title}</S.Title>
          <S.Subtitle>{description}</S.Subtitle>
        </article>
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
