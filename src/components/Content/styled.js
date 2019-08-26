import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Content = styled.article`
  ${T.Text1}

  &:not(:first-child) {
    margin-top: ${V.Space.md};
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.md};
  }

  h1 {
    ${T.Heading1}

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  h2 {
    ${T.Heading1}

    &:not(:first-child) {
      margin-top: ${V.Space.md};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  h3 {
    ${T.Heading2}

    &:not(:first-child) {
      margin-top: ${V.Space.md};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  a {
    ${T.Link}
  }

  blockquote {
    ${T.Heading3}
    border-left: ${V.Space.xxs} solid var(--highlightColor);
    font-style: italic;
    overflow-wrap: break-word;
    padding-bottom:  ${V.Space.sm};
    padding-left: ${V.Space.default};
    padding-top:  ${V.Space.sm};

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.lg};
    }
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  ol, ul {
    padding-left: 2.5rem;

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  li {
    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  img,
  .gatsby-resp-image-wrapper {
    width: 100%;

    & + em {
      font-size: 1.4rem;
    }
  }

  .gatsby-highlight {
    pre[class*="language-"] {
      border-left: ${V.Space.xxs} solid var(--highlightColor);
      padding-left: ${V.Space.default};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  hr {
    background-color: var(--borderColor);
    border: 0;
    height: 1px;
    margin-bottom: ${V.Space.default};
    margin-top: ${V.Space.default};
  }

  .language-text {
    background-color: var(--bgSecondary);
    color: var(--colorPrimary);
    padding-bottom: .3em;
    padding-left: .5em;
    padding-right: .5em;
    padding-top: .4em;
    text-shadow: none;
  }

  .twitter-tweet {
    ${T.Text2}

    p {
      ${T.Heading3}
      border-bottom: ${V.Border.box};
      font-style: normal;
      margin-bottom: ${V.Space.sm};
      padding-bottom: ${V.Space.sm};
    }

    a {
      ${T.Text2}

      &:before {
        content: '';
        display: block;
      }
    }
  }
`
