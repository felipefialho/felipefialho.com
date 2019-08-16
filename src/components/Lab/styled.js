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
  display: block;
  height: 100%;
`

export const LabImg = styled(Img).attrs(props => ({
  alt: props.title
}))`
  display: block;
`

export const LabDate = styled.time`
  display: block;
  margin-bottom: ${V.Space.xxs};
`

export const LabTitle = styled.h1`
  display: block;
  margin-bottom: ${V.Space.xxs};
`