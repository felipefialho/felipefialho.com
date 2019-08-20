import React from 'react'
import ReactGA from 'react-ga'

import { Link } from 'components/Typography'
import BlogPost from 'components/BlogPost'

import * as S from './styled'

const trackClickAllPosts = () => {
  ReactGA.event({
    category: 'Blog',
    action: 'click',
    label: `Blog - Click to view all posts`
  })
}

const BlogList = ({ list }) => {
  return (
    <S.BlogList>
      <S.Title>Últimas do blog</S.Title>
      <S.Nav>
        {list.map(({ node }, i) => (
          <BlogPost
            key={i}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
          />
        ))}
      </S.Nav>
      <Link to='/blog/' onClick={trackClickAllPosts}>
        Ver todos os posts
      </Link>
    </S.BlogList>
  )
}

export default BlogList
