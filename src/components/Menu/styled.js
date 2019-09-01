import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Menu = styled.nav`
  display: flex;

  > a {
    align-items: center;
    color: ${V.Color.white};
    cursor: pointer;
    display: inline-flex;
    font-size: 1.7rem;
    font-weight: 600;
    height: ${V.Height.headerSm};
    letter-spacing: .05rem;
    padding-left: ${V.Space.xs};
    padding-right: ${V.Space.xs};
    text-decoration: none;
    transition: color ${V.Transition.default};
    will-change: color;

    ${media.greaterThan('medium')`
      ${T.LinkTransition}

      &:after {
        background-color: ${V.Color.blueLight};
        margin-top: 0;
        top: calc(100% - 2px);
      }
    `}

    &:not(:last-child) {
      margin-right: ${V.Space.xs};
    }

    &.active {
      color: ${V.Color.blueLight};
    }

    &:focus,
    &:hover {
      color: ${V.Color.blueLight};
    }
  }
`
