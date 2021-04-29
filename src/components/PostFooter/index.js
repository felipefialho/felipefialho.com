import React from 'react'
import ReactGA from 'react-ga'

import * as S from './styled'

const trackClickOnPay = (item) => {
  ReactGA.event({
    category: 'Pay',
    action: 'click',
    label: `Pay - ${item}`
  })
}

const PostFooter = () => {
  return (
    <>
      <S.PostFooter>
        <S.PostFooterContent>
          <S.Title>
            Gostou do conteúdo? Aceito um café <span
              className="small"
              role="img"
              aria-label="Emoji de café">☕️</span>
            <span
              className="small"
              role="img"
              aria-label="Emoji com olhos de coração">😍</span>
          </S.Title>
          <S.PostFooterPay>
            <div className="item">Pix: <strong>hi@felipefialho.com</strong></div>
            <a className="item" href="https://app.picpay.com/user/felipe.fialho10" target="_blank" rel="noopener noreferrer" title="Transferir no PicPay" onClick={() => trackClickOnPay('PicPay')}>PicPay</a>
          </S.PostFooterPay>
        </S.PostFooterContent>
      </S.PostFooter>
      <S.PostFooter>
        <S.PostFooterContent>
          <S.Title>
            Encontrou algum problema no texto?
          Me ajude a corrigir! <span
              className="small"
              role="img"
              aria-label="Emoji sorrindo">😁</span>
          </S.Title>

          <p>Esse projeto é open source, então basta alterar o arquivo de texto, <a href="https://github.com/felipefialho/felipefialho.com/tree/master/content/posts" target="_blank" rel="noopener noreferrer" title="Alterar texto">diretamente no Github</a> e abrir um pull-request. É uma maneira simples e eficaz de contribuir com a comunidade de desenvolvimento web.</p>
        </S.PostFooterContent>

        <S.PostFooterContent>
          <S.Title>Me acompanhe por ai! <span
            className="small"
            role="img"
            aria-label="Emoji mostrando a lingua">😜</span>
          </S.Title>

          <p>
            - Youtube: <a href="https://youtube.com/FelipeFialhoDev" target="_blank" rel="noopener noreferrer" title="Ver Youtube">@FelipeFialhoDev</a> <br />
          - Twitter: <a href="https://twitter.com/felipefialho_" target="_blank" rel="noopener noreferrer" title="Ver Twitter">@felipefialho_</a> <br />
          - Github: <a href="https://github.com/felipefialho" target="_blank" rel="noopener noreferrer" title="Ver Github">@felipefialho</a> <br />
          - LinkedIn: <a href="https://www.linkedin.com/in/felipefialho/" target="_blank" rel="noopener noreferrer" title="Ver Linkedin">@felipefialho</a>
          </p>
        </S.PostFooterContent>
      </S.PostFooter>
    </>
  )
}

export default PostFooter
