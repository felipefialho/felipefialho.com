import styled from 'styled-components'

import * as V from 'styles/variables'

export const AdsGoogle = styled.div`
  &:not(:last-child) {
    margin-bottom: ${V.Space.default};
  }

  &:not(:first-child) {
    margin-top: ${V.Space.default};
  }
`
