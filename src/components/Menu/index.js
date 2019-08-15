import React from 'react'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import menuLinks from './content'

import * as S from './styled'
import * as V from 'styles/variables'

const trackClick = item => {
  ReactGA.event({
    category: 'menu',
    action: 'click',
    label: `Menu - ${item}`
  })
}

const getActiveTheme = () => {
  const body = document.querySelector('body');
  return body.classList.contains('theme-dark') ? V.Color.black : V.Color.white
}

const Menu = () => {
  return (
    <S.Menu>
      {menuLinks.map((link, i) => ( 
        <AniLink
          key={i}
          cover
          bg={getActiveTheme()}
          duration={.6}
          direction="down" 
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