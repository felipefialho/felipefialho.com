import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Footer = styled.footer.attrs({
  'role': 'dialog',
})`
  align-items: center;
  background-color: var(--bgSolid);
  border-top: ${V.Border.default};
  box-shadow: 2px 3px 4px var(--boxShadow);
  bottom: 0;
  color: ${V.Color.white};
  display: flex;
  height: ${V.Height.footer};
  justify-content: center;
  left: 0;
  padding-left: ${V.Space.default};
  padding-right: ${V.Space.default};
  position: fixed;
  right: 0;
  z-index: ${V.ZIndex.footer};
`

