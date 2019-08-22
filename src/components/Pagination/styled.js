import styled from 'styled-components'

import * as V from 'styles/variables'

export const Pagination = styled.nav`
  align-items: center;
  border-top: ${V.Border.box};
  color: var(--secondaryColor);
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  margin-top: ${V.Space.lg};
  padding-bottom: ${V.Space.sm};
  padding-top: ${V.Space.sm};
`
