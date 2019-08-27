import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { getActiveTheme } from 'utils/themes'

import menuLinks from './content'
import * as S from './styled'

const trackClick = (item) => {
  ReactGA.event({
    category: 'Menu',
    action: 'click',
    label: `Menu - ${item}`
  })
}

const Menu = () => {
  return (
    <S.Menu>
      {menuLinks.map((link, i) => (
        <AniLink
          partiallyActive={true}
          key={i}
          cover
          bg={getActiveTheme()}
          duration={.6}
          direction="down"
          to={link.url}
          onClick={trackClick(link.label)}
          activeClassName="active">
            {link.label}
        </AniLink>
      ))}
    </S.Menu>
  )
}

export default Menu
