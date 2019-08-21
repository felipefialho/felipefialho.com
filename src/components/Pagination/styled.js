import styled from 'styled-components'

import * as V from 'styles/variables'

export const Pagination = styled.nav`
  align-items: center;
  border-top: ${V.Border.box};
  color: var(--secondaryColor);
  display: flex;
  justify-content: space-between;
  margin-top: ${V.Space.lg};
  padding-bottom: ${V.Space.default};
  padding-top: ${V.Space.default};
`