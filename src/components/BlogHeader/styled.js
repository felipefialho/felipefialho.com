import styled from 'styled-components'
import Img from 'gatsby-image'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogHeader = styled.header`
  &:not(:last-child) {
    margin-bottom: ${V.Space.lg};
  }
`

export const BlogHeaderImage = styled(Img).attrs({
  alt: 'Imagem de introdução',
  'aria-hidden': 'true'
})`
  display: block;
  height: 50vh;
  left: calc(-50vw + 50%);
  margin-top: -${V.Height.mainTop};
  object-fit: cover;
  position: relative;
  width: 100vw;

  &:not(:last-child) {
    margin-bottom: ${V.Space.default};
  }
`

export const Title = styled.h1`
  ${T.Title}

  &:not(:last-child) {
    margin-bottom: ${V.Space.sm};
  }
`

export const Subtitle = styled.h2`
  ${T.Subtitle}

  &:not(:last-child) {
    margin-bottom: ${V.Space.default};
  }
`
