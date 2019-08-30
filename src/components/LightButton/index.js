import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const trackGetTheme = (theme) => {
  ReactGA.event({
    category: 'Theme',
    action: 'view',
    label: `Theme - Open page with ${theme}`,
    nonInteraction: true
  })
}

const trackClickTheme = (theme) => {
  ReactGA.event({
    category: 'Theme',
    action: 'click',
    label: `Theme - Change to ${theme}`
  })
}

const LightButton = () => {
  const [theme, setTheme] = useState(null)
  const darkMode = theme === 'dark'

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  if (theme !== null) {
    trackGetTheme(theme)
  }

  const onChange = () => {
    trackClickTheme(theme)
    window.__setTheme(darkMode ? 'light' : 'dark')

    if (window && window.DISQUS !== undefined) {
      window.setTimeout(() => window.DISQUS.reset({ reload: true }), 600)
    }
  }

  return (
    <S.LightButton active={!darkMode} onClick={onChange}>
      <Helmet>
        <body className={`${darkMode ? 'theme-dark' : 'theme-light'}`} />
      </Helmet>
      <S.LightButtonIcon />
    </S.LightButton>
  )
}

export default LightButton
