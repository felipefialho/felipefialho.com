import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import * as S from './styled'

const Avatar = () => {
  const { image } = useStaticQuery(
    graphql`
      query {
        image: file(relativePath: { eq: "profile-pic.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  return <S.Host fluid={image.childImageSharp.fluid} />
}

export default Avatar