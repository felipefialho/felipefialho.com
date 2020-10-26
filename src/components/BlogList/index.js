import React from 'react'
import ReactGA from 'react-ga'
import { useStaticQuery, graphql } from 'gatsby'

import Button from 'components/Button'
import BlogItem from 'components/BlogItem'

import * as S from './styled'

const trackClickAllPosts = () => {
  ReactGA.event({
    category: 'Blog',
    action: 'click',
    label: `Blog - Click to view all posts`
  })
}

const blogListQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
            description
            title
            tags
          },
          timeToRead
        }
      }
    }
  }
`

const BlogList = () => {
  const allBlogList = useStaticQuery(blogListQuery)
  const list = allBlogList.allMarkdownRemark.edges

  return (
    <S.BlogList>
      <S.Title>Últimas do blog</S.Title>
      <S.Nav>
        {list.map(({ node }, i) => (
          <BlogItem
            key={i}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
            tags={node.frontmatter.tags}
            timeToRead={node.timeToRead}
          />
        ))}
      </S.Nav>
      <div style={{ textAlign: 'center' }}>
        <Button to='/blog/' onClick={() => trackClickAllPosts()}>
          Ver todos os posts
        </Button>
      </div >
    </S.BlogList >
  )
}

export default BlogList
