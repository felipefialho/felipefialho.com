import styled from 'styled-components'
import Img from 'gatsby-image'

import * as V from '../../styles/variables'
import media from 'styled-media-query';

export const Host = styled(Img).attrs({
  title: 'Felipe Fialho',
  'aria-label': 'Felipe Fialho',
})`
  border-radius: 50%;
  display: block;
  object-fit: cover;
  height: ${V.Space.md};
  width: ${V.Space.md};

  ${media.greaterThan(V.Screen.sm)`
    height: ${V.Space.lg};
    width: ${V.Space.lg};
  `}
`
