import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const BlogList = styled.section`
  display: block;

  &:not(:first-child) {
    margin-top: ${V.Space.default};
  }
`

export const Title = styled.h1`
  ${T.Subtitle}

  &:not(:last-child) {
    margin-bottom: ${V.Space.xxs};
  }
`
