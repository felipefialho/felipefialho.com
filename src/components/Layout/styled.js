import styled from 'styled-components'
import media from 'styled-media-query';

import * as V from '../../styles/variables'

export const Layout = styled.section`
  display: block;
`

export const Main = styled.main.attrs({
  role: 'main',
})`
  padding-top: ${V.Height.headerSm};
  width: 100%;

  ${media.greaterThan('medium')`
    padding-top: ${V.Height.headerLg};
  `}
`
