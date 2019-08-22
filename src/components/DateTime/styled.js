import styled from 'styled-components'

import * as V from 'styles/variables'

export const DateTime = styled.time`
  color: var(--secondaryColor);
  display: block;
  font-size: 1.2rem;
  letter-spacing: .1rem;

  &:not(:last-child) {
    margin-bottom: ${V.Space.xxs};
  }
`
