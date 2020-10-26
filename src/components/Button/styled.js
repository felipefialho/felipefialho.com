import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Button = styled(AniLink)`
  ${T.Text2};
  align-items: center;
  border: var(--highlightColor) solid 1px;
  border-radius: ${V.Space.md};
  color: var(--highlightColor);
  display: inline-flex;
  height: ${V.Space.md};
  justify-content: center;
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  overflow: hidden;
  position: relative;
  text-transform: lowercase;
  will-change: color;

  > span {
    position: relative;
    z-index: ${V.ZIndex.default};
  }

  &:before {
    background-color: var(--highlightColor);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleX(0);
  }

  &:hover,
  &:focus {
    color: ${V.Color.white};
    transition: color ${V.Transition.default};

    &:before {
      transform: scaleX(1);
      transition: transform ${V.Transition.default};
    }
  }
`
