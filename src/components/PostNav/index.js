import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

import BlogItem from 'components/BlogItem'

import * as S from './styled'

const trackClick = (item) => {
  ReactGA.event({
    category: 'Post Navigation',
    action: 'click',
    label: `Post Navigation - Go to ${item}`
  })
}

const PostNav = ({ next, previous }) => {
  return (
    <S.PostNav>
      {previous && (
        <S.NavItem>
          <S.Title>Anterior</S.Title>
          <BlogItem
            slug={previous.fields.slug}
            date={previous.frontmatter.date}
            title={previous.frontmatter.title}
            timeToRead={previous.timeToRead}
            isMini={true}
            gaLabel='Post Navigation'
            onClick={() => trackClick(`previous page ${previous.frontmatter.title}`)}
          />
        </S.NavItem>
      )}
      {next && (
        <S.NavItem>
          <S.Title>Próximo</S.Title>
          <BlogItem
            slug={next.fields.slug}
            date={next.frontmatter.date}
            title={next.frontmatter.title}
            timeToRead={next.timeToRead}
            isMini={true}
            gaLabel='Post Navigation'
            onClick={() => trackClick(`next page ${next.frontmatter.title}`)}
          />
        </S.NavItem>
      )}
    </S.PostNav>
  )
}

PostNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object
}

export default PostNav
