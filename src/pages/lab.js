import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import SEO from 'components/Seo';
import Lab from 'components/Lab';

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
      <Lab content={content} />
    </Layout>
  )
}

export default LabPage
