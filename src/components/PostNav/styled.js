import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const PostNav = styled.nav`
  display: flex;
  justify-content: space-between;

  &:not(:first-child) {
    border-top: ${V.Border.default}; 
    margin-top: ${V.Space.lg};
    padding-top: ${V.Space.default};
  }
`

export const Title = styled.h2`
  ${T.Subtitle2}

  &:not(:last-child) {
    margin-bottom: ${V.Space.sm};
  }
`

export const NavItem = styled.div`
  display: block;
  height: 100%;
  max-width: calc(50% - ${V.Space.xs});
`
