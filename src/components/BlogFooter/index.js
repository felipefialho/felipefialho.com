import React from 'react'

import * as S from './styled'

const BlogFooter = () => {
  return (
    <S.BlogFooter>
      <h2>Me acompanhe por ai! <span
        className="small"
        role="img"
        aria-label="Emoji mostrando a lingua">😜</span>
      </h2>

      <p>
        - Twitter: <a href="https://twitter.com/felipefialho_" target="_blank" rel="noopener noreferrer" title="Ver Twitter">@felipefialho_</a> <br />
        - Github: <a href="https://github.com/felipefialho" target="_blank" rel="noopener noreferrer" title="Ver Github">@felipefialho</a> <br />
        - Linkedin: <a href="https://www.linkedin.com/in/felipefialho/" target="_blank" rel="noopener noreferrer" title="Ver Linkedin">@felipefialho</a>
      </p>
    </S.BlogFooter>
  )
}

export default BlogFooter
