import styled from 'styled-components'
import { LightBulb } from 'styled-icons/octicons/LightBulb'

import * as V from '../../styles/variables'

export const LightButton = styled.button.attrs(props => ({
  title: props.active ? `Apagar a luz` : `Acender a luz`,
  'role': 'button',
}))`
  color: ${props => (props.active ? `${V.Color.yellow}` : `${V.Color.white}`)};
  cursor: pointer;
  display: inline-block;

  &:focus {
    outline: transparent;
  }
`

export const LightButtonIcon = styled(LightBulb)`
  display: block;
  fill: currentColor;
  height: ${V.Space.default};
  width: ${V.Space.default};
`;