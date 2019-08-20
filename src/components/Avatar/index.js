import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import * as S from './styled'

const { image } = useStaticQuery(
  graphql`
    query {
      image: file(relativePath: { eq: "profile-pic.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 48, quality: 60) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `
)

const Avatar = () => {
  return <S.Avatar fluid={image.childImageSharp.fluid} />
}

export default Avatar
