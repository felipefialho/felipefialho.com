import React from 'react'
import ReactGA from 'react-ga'

import * as S from './styled'
import { graphql, useStaticQuery } from 'gatsby';

const trackClickLab = (item) => {
  ReactGA.event({
    category: 'Lab',
    action: 'click',
    label: `Lab - Going to ${!item ? 'Dark' : 'Light'}`
  })
}

const LabImg = ({ imageSrc }) => {
  const { images } = useStaticQuery(
    graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "lab" } }) {
          edges {
              node {
                extension
                relativePath
                childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  )

  const image = images.edges.find(image => {
    return image.node.relativePath === imageSrc.relativePath
  })

  return <S.LabImg fluid={image.node.childImageSharp.fluid} />
}

const Lab = ({ content }) => {
  return (
    <S.LabList>
      {content.map(({ node }) => {
        return (
          <article key={node.id}>
            <S.LabItem href={node.path} title={node.title} onClick={trackClickLab}>
              <LabImg imageSrc={node.imageSrc} />
              <S.LabDate>{node.date}</S.LabDate>
              <S.LabTitle>{node.title}</S.LabTitle>
              <S.LabDescription>{node.description}</S.LabDescription>
            </S.LabItem>
          </article>
        )
      })}
    </S.LabList>
  )
}

export default Lab
