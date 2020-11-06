import styled from 'styled-components'

import * as V from 'styles/variables'

export const Footer = styled.footer.attrs({
  'role': 'contentinfo',
})`
  align-items: center;
  background-color: var(--bgSolid);
  border-top: ${V.Border.default};
  bottom: 0;
  box-shadow: 2px 3px 4px var(--boxShadow);
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

