import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import BlogPost from 'components/BlogPost'

import * as S from './styled'

const BlogList = ({ list }) => {
  return (
    <S.BlogList>
      {list.map(({ node }, i) => (
        <BlogPost
          key={i}
          slug={node.fields.slug}
          date={node.frontmatter.date}
          title={node.frontmatter.title}
          description={node.frontmatter.description}
        />
      ))}
    </S.BlogList>
  )
}

export default BlogList