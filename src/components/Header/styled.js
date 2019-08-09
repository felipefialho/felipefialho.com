import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from '../../styles/variables'

export const Header = styled.header.attrs({
  role: 'banner',
})`
  align-items: center;
  background-color: var(--bgSecondary);
  color: var(--colorPrimary);
  display: flex;
  justify-content: space-between;
  height: ${V.Space.lg};
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  transition: background-color .3s;
  width: 100%;
  will-change: background-color;
  
  ${media.greaterThan('medium')`
    background-color: ${V.Color.black};
    height: ${V.Height.headerLg};
    padding-left: ${V.Space.default};
    padding-right: ${V.Space.default};
    position: fixed;
    width: 100%;
  `}
`

export const Brand = styled.div`
  ${media.greaterThan('medium')`
    align-items: center;
    display: flex;

    > *:not(:last-child) {
      margin-right: ${V.Space.sm};
    }
  `}
`