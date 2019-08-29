import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Header = styled.header.attrs({
  role: 'banner',
})`
  background-color: var(--bgSecondary);
  color: var(--colorPrimary);
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  text-transform: lowercase;
  top: 0;
  transition: background-color .3s;
  width: 100%;
  will-change: background-color;

  ${media.greaterThan('medium')`
    background-color: ${V.Color.black};
  `}
`

export const Main = styled.div`
  align-items: center;
  display: flex;
  height: ${V.Height.headerBarSm};
  justify-content: space-between;

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

export const Menu = styled.div`
  align-items: center;
  display: flex;

  > * {
    &:not(:last-child) {
      margin-right: ${V.Space.default};
    }
  }
`

export const Bar = styled.div.attrs({
  'aria-hidden': 'true',
})`
  align-items: center;
  background-color: ${V.Color.black};
  color: ${V.Color.white};
  display: flex;
  height: ${V.Height.headerBarSm};
  justify-content: space-between;
  padding-left: ${V.Space.default};
  padding-right: ${V.Space.default};
`

export const Title = styled.h1`
  color: ${V.Color.white};
  display: inline-block;
  font-size: 2.1rem;
  letter-spacing: .025rem;
`
