import React from 'react'

import Container from 'components/Container'

import * as S from './styled'

const FooterData = () => {
  return (
    <S.FooterData>
      <Container>
        ©{new Date().getFullYear()} felipefialho.com
        <a className="link" href="/policies">Política de Privacidade</a>
        <a className="link" href="https://github.com/felipefialho/felipefialho.com/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
      </Container>
    </S.FooterData>
  )
}

export default FooterData
