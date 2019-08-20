import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogPost = styled(AniLink)`
  background-color: var(--bg);
  border: ${V.Border.box};
  border-radius: ${V.BorderRadius.box};
  box-shadow: ${V.BoxShadow.box};
  color: var(--primaryColor);
  display: block;
  padding: ${V.Space.default};
  transition: border-color ${V.Transition.default};
  will-change: border-color;

  &:hover {
    border-color: var(--highlightColor);
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.default};
  }
`

export const Title = styled.h1`
  ${T.Subheading}
  margin-bottom: ${V.Space.sm};
`

export const Subtitle = styled.h2`
  ${T.Subtitle}
`
