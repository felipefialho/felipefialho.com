import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogPost = styled(AniLink)`
  display: block;

  &:not(:last-child) {
    margin-bottom: ${V.Space.default};
  }
`

export const Title = styled.h1`
  ${T.Subheading}

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
