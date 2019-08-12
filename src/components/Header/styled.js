import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from '../../styles/variables'

export const Header = styled.header.attrs({
  role: 'banner',
})`
  background-color: var(--bgSecondary); 
  color: var(--colorPrimary);
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  text-transform: lowercase;
  top: 0;
  transition: background-color .3s;
  will-change: background-color;
  width: 100%;

  ${media.greaterThan('medium')`
    background-color: ${V.Color.grayDarker};
  `}
`

export const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: ${V.Height.headerBarSm};
  
  ${media.greaterThan('medium')`
    height: ${V.Height.headerLg};
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
  align-items: center;
  background-color: ${V.Color.grayDarker};
  color: ${V.Color.white}; 
  display: flex;
  height: ${V.Height.headerBarSm};
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  
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