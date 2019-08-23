import styled from 'styled-components'

import * as V from 'styles/variables'

export const BlogFooter = styled.footer`
  margin-bottom: ${V.Space.lg};

  &:not(:first-child) {
    border-top: ${V.Border.default}; 
    margin-top: ${V.Space.lg};
    padding-top: ${V.Space.default};
  }
`