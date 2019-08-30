import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'
import Content from 'components/Content'
import DisqusWrapper from 'components/DisqusWrapper'

import PostHeader from 'components/PostHeader'
import PostFooter from 'components/PostFooter'
import PostNav from 'components/PostNav'

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const next = props.pageContext.next
  const previous = props.pageContext.previous

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image.relativePath ? `https://felipefialho.com/assets/${post.frontmatter.image.relativePath}` : 'https://felipefialho.com/assets/og-image.jpg'}
      />
      <GridTemplate>
        <PostHeader
          image={post.frontmatter.image}
          tags={post.frontmatter.tags}
          date={post.frontmatter.date}
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          timeToRead={post.timeToRead}
        />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>

        <PostFooter />
        <PostNav previous={previous} next={next} />
        <DisqusWrapper title={post.frontmatter.title} slug={post.fields.slug} />
      </GridTemplate>
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
          relativePath
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
