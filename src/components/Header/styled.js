import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from '../../styles/variables'

export const Host = styled.header.attrs({
  role: 'banner',
})`
  align-items: center;
  background-color: var(--bgSecondary);
  color: var(--colorPrimary);
  display: flex;
  justify-content: space-between;
  height: ${V.Space.lg};
  padding-left: ${V.Space.default};
  padding-right: ${V.Space.default};
  width: 100%;
  
  ${media.greaterThan(V.Screen.sm)`
    height: ${V.Height.headerLg};
    position: fixed;
    width: 100%;
  `}
`
