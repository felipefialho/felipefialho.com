import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Layout = styled.section`
  background-color: var(--bg);
  display: block;
`

export const Main = styled.main.attrs({
  role: 'main',
})`
  margin-top: ${V.Height.headerSm};
  min-height: 100vh;
  padding-bottom: ${V.Space.md};
  padding-top: ${V.Height.mainTop};
  width: 100%;

  ${media.greaterThan('medium')`
    margin-top: ${V.Height.headerLg};
  `}
`
