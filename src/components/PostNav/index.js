import React from 'react'

import BlogItem from 'components/BlogItem'

import * as S from './styled'

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
          />
        </S.NavItem>
      )}
    </S.PostNav>
  )
}

export default PostNav
