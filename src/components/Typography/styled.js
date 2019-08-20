import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Date = styled.time`
  color: var(--secondaryColor);
  display: block;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  margin-bottom: ${V.Space.xxs};
`

export const Link = styled(AniLink)`
  ${T.Link}
  display: inline-block;
`
