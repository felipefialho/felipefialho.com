import styled from 'styled-components'

import * as V from 'styles/variables'

export const BoxHandler = styled.article`
  background-color: var(--bg);
  border: ${V.Border.box};
  border-radius: ${V.BorderRadius.box};
  box-shadow: ${V.BoxShadow.box};
  color: var(--primaryColor);
  display: block;
  height: 100%;
  min-height: 15rem;
  padding: ${V.Space.default};
  transition: border-color ${V.Transition.default};
  will-change: border-color;

  &:hover {
    border-color: var(--highlightColor);
  }
`
