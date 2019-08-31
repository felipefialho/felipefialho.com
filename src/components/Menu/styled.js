import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

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
        color: ${V.Color.blueLight};
      }

      &:focus,
      &:hover {
        color: ${V.Color.blueLight};

        &:after {
          background-color: ${V.Color.blueLight};
        }
      }
    `}
  }
`
