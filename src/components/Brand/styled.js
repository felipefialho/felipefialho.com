import styled from 'styled-components'

import * as V from '../../styles/variables'
import media from 'styled-media-query';

export const Brand = styled.div.attrs({
  'role': 'logo',
  'aria-label': 'Felipe Fialho',
})` 
  display: none;

  ${media.greaterThan(V.Screen.sm)`
    display: inline-block;
    fill: ${V.Color.blueLight};
    width: ${V.Space.xxlg};
  `}
`