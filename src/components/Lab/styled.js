import styled from 'styled-components'
import Img from 'gatsby-image'
import media from 'styled-media-query'

import * as V from 'styles/variables'

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
  background-color: var(--bgSecondary);
  border: 1px solid transparent;
  box-shadow: 0px 1px 2px 1px rgba(0,0,0, .05);
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

export const LabImg = styled(Img).attrs(props => ({
  alt: props.title
}))`
  display: block;
  margin-bottom: ${V.Space.default};
`

export const LabDate = styled.time`
  color: var(--secondaryColor);
  display: block;
  font-size: .8em;
  margin-bottom: ${V.Space.xxs};
`

export const LabTitle = styled.h1`
  display: block;
  font-weight: 600;
  margin-bottom: ${V.Space.sm};
`

export const LabDescription = styled.p`
  color: var(--secondaryColor);
  display: block;
`
