import styled from 'styled-components'

import * as V from 'styles/variables'

export const DisqusWrapper = styled.footer`
  margin-top: ${V.Space.lg};
  
  #disqus_thread {
    .publisher-anchor-color {
      background-color: red;
    }
  }
`