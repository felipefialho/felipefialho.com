import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ReactGA from 'react-ga'

import * as S from './styled'

const trackClick = (item) => {
  ReactGA.event({
    category: 'Social',
    action: 'click',
    label: `Social - ${item}`
  })
}

const Social = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              youtubeLink
              twitterLink
              linkedinLink
              githubLink
            }
          }
        }
      }
    `
  )

  return (
    <S.Social>
      <S.SocialItem
        href={site.siteMetadata.social.youtubeLink}
        title="Youtube"
        onClick={() => trackClick('Youtube')}>
        <S.SocialYoutube />
      </S.SocialItem>
      <S.SocialItem
        href={site.siteMetadata.social.twitterLink}
        title="Twitter"
        onClick={() => trackClick('Twitter')}>
        <S.SocialTwitter />
      </S.SocialItem>
      <S.SocialItem
        href={site.siteMetadata.social.githubLink}
        title="Github"
        onClick={() => trackClick('Github')} >
        <S.SocialGithub />
      </S.SocialItem>
      <S.SocialItem
        href={site.siteMetadata.social.linkedinLink}
        title="LinkedIn"
        onClick={() => trackClick('LinkedIn')}>
        <S.SocialLinkedin />
      </S.SocialItem>
    </S.Social>
  )
}

export default Social
