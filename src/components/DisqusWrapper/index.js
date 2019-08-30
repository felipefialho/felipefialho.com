import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

import * as S from './styled'

const DisqusWrapper = ({ slug, title }) => {
  const url = `https://felipefialho.com/blog${slug}`
  return (
    <S.DisqusWrapper>
      <ReactDisqusComments
        shortname="felipefialho"
        identifier={url}
        title={title}
        url={url}
      />
    </S.DisqusWrapper>
  )
}

DisqusWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

export default DisqusWrapper
