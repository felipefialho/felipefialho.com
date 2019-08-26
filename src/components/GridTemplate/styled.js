import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const GridTemplate = styled.div`
  ${media.greaterThan('medium')`
    display: grid;
    grid-column-gap: ${V.Space.default};
    grid-template-columns: minmax(10rem, 15rem) minmax(65rem, 1fr) minmax(10rem, 15rem);
  `}
`

export const GridContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 65rem;
`
