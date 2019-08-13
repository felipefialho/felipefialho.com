import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const LightButton = () => {
  const [active, setActive] = useState(true)

  const onChangeActive = () => {
    setActive(!active)
  }
  
  useEffect(() => {
  }, [])

  return (
    <S.LightButton active={active} onClick={() => onChangeActive()}>
      <Helmet>
        <body className={`${active ? 'theme-light' : 'theme-dark'}`} />
      </Helmet>
      <S.LightButtonIcon />
    </S.LightButton>
  )
}

export default LightButton