import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as T from 'styles/typography'

export const ButtonLink = styled(AniLink)`
  ${T.Link}
  display: inline-block;
  font-size: 1.6rem;
`
