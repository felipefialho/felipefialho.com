import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from '../../styles/variables'

export const Header = styled.header.attrs({
  role: 'banner',
})`
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  text-transform: lowercase;
  top: 0;
  width: 100%;
`

export const Main = styled.div`
  align-items: center;
  background-color: var(--bgSecondary);
  color: var(--colorPrimary);
  display: flex;
  justify-content: space-between;
  height: ${V.Space.lg};
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  transition: background-color .3s;
  will-change: background-color;
  
  ${media.greaterThan('medium')`
    background-color: ${V.Color.grayDarker};
    height: ${V.Height.headerLg};
    padding-left: ${V.Space.default};
    padding-right: ${V.Space.default};
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

export const Bar = styled.div.attrs({
  'aria-hidden': 'true',
})`
  background-color: ${V.Color.grayDarker};
  color: ${V.Color.white}; 
  padding: ${V.Space.sm};
  
  ${media.greaterThan('medium')`
    display: none;
  `}
`

export const Title = styled.h1`
  display: none;

  ${media.greaterThan('medium')`
    color: ${V.Color.blueLight};
    display: inline-block;
    font-size: 2rem;
  `}
`