import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogFooter = styled.div`
  ${T.Text1}
  margin-bottom: ${V.Space.lg};

  &:not(:first-child) {
    border-top: ${V.Border.default}; 
    margin-top: ${V.Space.lg};
    padding-top: ${V.Space.default};
  }
`

export const Title = styled.h2`
  ${T.Subtitle1}

  &:not(:last-child) {
    margin-bottom: ${V.Space.sm};
  }
`
