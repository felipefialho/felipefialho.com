import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogPost = styled(AniLink)`
  ${T.Text}
  background-color: var(--bgSecondary);
  border: 1px solid transparent;
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

export const Title = styled.h2`
  font-weight: 600;
  margin-bottom: ${V.Space.xxs};
`
