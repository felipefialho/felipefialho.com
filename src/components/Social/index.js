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
      <S.SocialItem 
        href={site.siteMetadata.social.codepenLink} 
        title="Codepen"
        onClick={() => trackClick('Codepen')}>
        <S.SocialCodepen />
      </S.SocialItem>
    </S.Social>
  )
}

export default Social
