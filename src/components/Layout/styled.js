import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Layout = styled.section`
  display: block;
`

export const Main = styled.main.attrs({
  role: 'main',
})`
  margin-top: ${V.Height.headerSm};
  padding-bottom: ${V.Space.md};
  padding-top: ${V.Height.mainTop};
  width: 100%;

  ${media.greaterThan('medium')`
    margin-top: ${V.Height.headerLg};
  `}
`
