import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const GridTemplate = styled.section`
  ${media.greaterThan('medium')`
    display: grid;
    grid-column-gap: ${V.Space.default};
    grid-template-columns: minmax(auto, 15rem) minmax(63rem, 1fr) minmax(auto, 15rem);
  `}
`