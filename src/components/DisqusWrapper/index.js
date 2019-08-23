import React from 'react'
import PropTypes from 'prop-types'
import { Disqus } from 'gatsby-plugin-disqus'

import * as S from './styled'

const DisqusWrapper = ({ disqusConfig }) => {
  return (
    <S.DisqusWrapper>
      <Disqus config={disqusConfig} />
    </S.DisqusWrapper>
  )
}

DisqusWrapper.propTypes = {
  disqusConfig: PropTypes.object.isRequired
}

export default DisqusWrapper
