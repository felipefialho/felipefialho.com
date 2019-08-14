import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import * as S from './styled'

const Social = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              twitterLink
              linkedinLink
              githubLink
              codepenLink
              mediumLink
            }
          }
        }
      }
    `
  )

  return (
    <S.Social>
      <S.SocialItem href={site.siteMetadata.social.twitterLink} title="Twitter">
        <S.SocialTwitter />
      </S.SocialItem>
      <S.SocialItem href={site.siteMetadata.social.githubLink} title="Github">
        <S.SocialGithub />
      </S.SocialItem>
      <S.SocialItem href={site.siteMetadata.social.linkedinLink} title="LinkedIn">
        <S.SocialLinkedin />
      </S.SocialItem>
      <S.SocialItem href={site.siteMetadata.social.codepenLink} title="Codepen">
        <S.SocialCodepen />
      </S.SocialItem>
    </S.Social>
  )
}

export default Social
