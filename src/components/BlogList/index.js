import React from 'react'

import BlogPost from 'components/BlogPost'

import * as S from './styled'

const BlogList = ({ list }) => {
  return (
    <S.BlogList>
      <S.Title>Últimas do blog</S.Title>
      <nav>
        {list.map(({ node }, i) => (
          <BlogPost
            key={i}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
          />
        ))}
      </nav>
    </S.BlogList>
  )
}

export default BlogList
