import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'
import Content from 'components/Content'
import BlogHeader from 'components/BlogHeader'
import BlogFooter from 'components/BlogFooter'

const content = ({ post }) => {
  return (
    <section>
      <BlogHeader
        image={post.frontmatter.image}
        tags={post.frontmatter.tags}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        timeToRead={post.timeToRead}
      />
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <BlogFooter />
      </Content>
    </section>
  )
}

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const next = props.pageContext.next
  const previous = props.pageContext.previous

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={`https://felipefialho.com${post.frontmatter.image}`}
      />
      <GridTemplate content={content({ post })} />
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        description
        title
        tags
        image {
          id
          childImageSharp {
            fluid(maxWidth: 1280, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      timeToRead
    }
  }
`
