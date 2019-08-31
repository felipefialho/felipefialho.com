import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Menu = styled.nav`
  display: flex;

  > a {
    color: ${V.Color.white};
    cursor: pointer;
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: .05rem;
    text-decoration: none;
    transition: color ${V.Transition.default};
    will-change: color;

    &:not(:last-child) {
      margin-right: ${V.Space.default};
    }

    ${media.lessThan('small')`
      &.active {
        color: var(--highlightColor);
      }

      &:focus,
      &:hover {
        color: var(--highlightColor);

        &:after {
          background-color: var(--highlightColor);
        }
      }
    `}

    ${media.greaterThan('medium')`
      ${T.LinkTransition}

      &.active {
        color: ${V.Color.blueLight};
      }

      &:after {
        background-color: ${V.Color.blueLight};
      }

      &:focus,
      &:hover {
        color: ${V.Color.blueLight};
      }
    `}
  }
`
