import styled from 'styled-components'
import Img from 'gatsby-image'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const LabList = styled.section`
  display: grid;
  grid-column-gap: ${V.Space.default};
  grid-row-gap: ${V.Space.default};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

export const LabItem = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: '_blank',
  rel: 'noopener noreferrer'
}))`
  color: var(--primaryColor);
  display: block;
`

export const Image = styled(Img).attrs(props => ({
  alt: props.title
}))`
  display: block;
  margin-bottom: ${V.Space.default};
`

export const Title = styled.h1`
  ${T.Heading2}

  &:not(:first-child) {
    margin-top: ${V.Space.sm};
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.xxs};
  }
`

export const Text = styled.p`
  ${T.Subtitle2}
`
