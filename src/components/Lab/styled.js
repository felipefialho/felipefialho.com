import styled from 'styled-components'
import Img from 'gatsby-image'
import media from 'styled-media-query'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const LabList = styled.section`
  display: grid;
  grid-column-gap: ${V.Space.default};
  grid-row-gap: ${V.Space.default};
  grid-template-columns: repeat(2, 1fr);

  ${media.greaterThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`

export const LabItem = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: '_blank',
  rel: 'noopener noreferrer'
}))`
  background-color: var(--bg);
  border: ${V.Border.box};
  border-radius: ${V.BorderRadius.box};
  box-shadow: ${V.BoxShadow.box};
  color: var(--primaryColor);
  display: block;
  height: 100%;
  padding: ${V.Space.default};
  transition: border-color ${V.Transition.default};
  will-change: border-color;

  &:hover {
    border-color: var(--highlightColor);
  }
`

export const Image = styled(Img).attrs(props => ({
  alt: props.title
}))`
  display: block;
  margin-bottom: ${V.Space.default};
`

export const Title = styled.h1`
  font-weight: 600;
  margin-bottom: ${V.Space.sm};
`

export const Text = styled.p`
  ${T.Text}
  color: var(--secondaryColor);
`
