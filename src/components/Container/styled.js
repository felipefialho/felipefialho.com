import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  max-width: ${V.MaxSize.lg};

  ${media.greaterThan('medium')`
    padding-left: ${V.Space.default};
    padding-right: ${V.Space.default};
  `}
`
