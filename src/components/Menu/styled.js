import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Menu = styled.nav`
  display: flex;

  > a {
    color: var(--primaryColor);
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    text-decoration: none;
    transition: color ${V.Transition.default};
    will-change: color;
    
    &:not(:last-child) {
      margin-right: ${V.Space.default};
    }

    &.active,
    &:focus,
    &:hover {
      color: var(--highlightColor);
    }
    
    ${media.greaterThan('medium')`
      color: ${V.Color.white};
      position: relative;

      &:after {
        content: '';
        height: 2px;
        margin-top: ${V.Space.xs};
        left: 0;
        position: absolute;
        right: 0;
        transition: background-color ${V.Transition.default};
        top: 100%;
        will-change: background-color;
      }

      &.active{
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