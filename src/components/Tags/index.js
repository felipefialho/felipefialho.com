import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { getActiveTheme } from 'utils/themes'

import * as S from './styled'

const trackClick = (item) => {
  ReactGA.event({
    category: 'Tag',
    action: 'click',
    label: `Tag - ${item}`
  })
}

const Tags = ({ tags, isLink }) => {
  return (
    <S.Tags>
      <S.TagIcon />
      {tags.map((tag, i) => (
        <S.TagHolder key={i}>
          { isLink ? (
            <AniLink 
              to={`blog?query=` + tag}
              cover
              direction="down"
              duration={1}
              onClick={() => trackClick(tag)}
              bg={getActiveTheme()}>
                <S.TagItem>{tag}</S.TagItem>
            </AniLink>
            ) : (<S.TagItem>{tag}</S.TagItem>)
          }
        </S.TagHolder>
      ))}
    </S.Tags>
  )
}

Tags.propTypes = {
  tags: PropTypes.node.isRequired,
  isLink: PropTypes.bool
}

export default Tags
