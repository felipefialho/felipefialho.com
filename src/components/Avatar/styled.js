import styled from 'styled-components'
import Img from 'gatsby-image'
import media from 'styled-media-query'

import * as V from 'styles/variables'

export const Avatar = styled(Img).attrs({
  title: 'Felipe Fialho',
  'aria-label': 'Felipe Fialho',
})`
  border-radius: 50%;
  display: block;
  object-fit: cover;
  height: ${V.Space.md};
  width: ${V.Space.md};

  ${media.greaterThan('medium')`
    height: ${V.Space.lg};
    width: ${V.Space.lg};
  `}
`
