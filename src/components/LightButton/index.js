import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const trackGetTheme = (darkMode) => {
  ReactGA.event({
    category: 'Theme',
    action: 'get theme',
    label: `Theme - Open with ${darkMode ? 'Dark' : 'Light'}`
  })
}

const trackClickTheme = (darkMode) => {
  ReactGA.event({
    category: 'Theme',
    action: 'click',
    label: `Theme - Change to ${!darkMode ? 'Dark' : 'Light'}`
  })
}

const useDarkModeFromLocalStorage = () => {
  const item = 'darkMode';
  const initialState = () => JSON.parse(localStorage.getItem(item) || false)
  const [ darkMode, setDarkMode ] = useState(initialState)

  useEffect(() => localStorage.setItem(item, JSON.stringify(darkMode)), [darkMode])

  trackGetTheme(darkMode)

  return [ darkMode, setDarkMode ]
};

const LightButton = () => {
  const [ darkMode, setDarkMode ] = useDarkModeFromLocalStorage()

  const onChange = () => {
    trackClickTheme(darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <S.LightButton active={!darkMode} onClick={onChange}>
      <Helmet>
        <body className={`${darkMode ? 'theme-dark' : 'theme-light'}`} />
      </Helmet>
      <S.LightButtonIcon />
      {darkMode}
    </S.LightButton>
  )
}

export default LightButton
