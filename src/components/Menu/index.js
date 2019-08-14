import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import menuLinks from './content'
import * as S from './styled'
 
const trackClick = item => {
  ReactGA.event({
    category: 'menu',
    action: 'click',
    label: `Menu - ${item}`
  })
}

const Menu = () => {
  return (
    <S.Menu>
      {menuLinks.map((link, i) => ( 
        <AniLink
          key={i}
          cover
          direction="left" 
          to={link.url}
          onClick={() => trackClick(link.label)}
          activeClassName="active">
            {link.label}
        </AniLink>
      ))}
    </S.Menu>
  )
}

export default Menu