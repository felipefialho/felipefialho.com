import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Layout = styled.section`
  background-color: var(--bg);
  display: block;
  transition: background-color ${V.Transition.default};
  will-change: background-color;
`

export const Main = styled.main.attrs({
  role: 'main',
})`
  margin-bottom: ${V.Height.footer};
  margin-top: ${V.Height.headerSm};
  min-height: 100vh;
  padding-bottom: ${V.Space.xxlg};
  padding-top: ${V.Height.mainTop};
  width: 100%;

  ${media.greaterThan('medium')`
    margin-top: ${V.Height.headerLg};
  `}
`
