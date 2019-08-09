import styled from 'styled-components'
import media from 'styled-media-query';

import * as V from '../../styles/variables'

export const Brand = styled.div.attrs({
  'role': 'logo',
  'aria-label': 'Felipe Fialho',
})` 
  display: none;

  ${media.greaterThan('medium')`
    display: inline-block;
    fill: ${V.Color.blueLight};
    width: ${V.Space.xxlg};
  `}
`