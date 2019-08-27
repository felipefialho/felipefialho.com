import styled from 'styled-components'

import * as V from 'styles/variables'

export const BoxHandler = styled.article`
  border-radius: ${V.BorderRadius.box};
  box-shadow: ${V.BoxShadow.box};
  color: var(--primaryColor);
  display: block;
  height: 100%;
  min-height: 15rem;
  padding: ${V.Space.default};
  position: relative;
  will-change: border-color;

  &:after,
  &:before {
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform ${V.Transition.default};
  }

  &:before {
    border-left: 1px solid var(--highlightColor);
    border-right: 1px solid var(--highlightColor);
    transform: scaleY(0);
  }

  &:after {
    border-bottom: 1px solid var(--highlightColor);
    border-top: 1px solid var(--highlightColor);
    transform: scaleX(0);
  }

  &:hover {
    &:before {
      transform: scaleY(1)
    }

    &:after {
      transform: scaleX(1)
    }
  }
`
