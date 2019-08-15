import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import SEO from 'components/Seo';

const LabPage = () => {
  const { allLabJson } = useStaticQuery(
    graphql`
      query {
        allLabJson {
          edges {
            node {
              id,
              path
              title
              date
              description
              imageSrc {
                relativePath
              }
            }
          }
        }
      }
    `
  )

  const content = allLabJson.edges

  return (
    <Layout>
      <SEO title='Lab' />
      {content.map(({ node }) => {
        return (
          <a href={node.path} key={node.id}>
            {node.date}
          </a>
        )
      })}
    </Layout>
  )
}

export default LabPage
