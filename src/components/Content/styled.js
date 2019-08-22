import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Content = styled.article`
  ${T.Text}

  &:not(:first-child) {
    margin-top: ${V.Space.md};
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.md};
  }

  h1 {
    ${T.Title}

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    ${T.Subtitle}
    color: var(--secondaryColor);

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    font-weight: 300;

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  a {
    ${T.Link}
  }

  blockquote {
    font-size: 3rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.36px;
    line-height: 4.4rem;
    overflow-wrap: break-word;
    padding-left: ${V.Space.lg};

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.md};
    }
  }

  code {
    background: ${V.Color.black};
    border-radius: 2px;
    color: ${V.Color.white};
    font-size: 1.8rem;
    padding: ${V.Space.xxs} ${V.Space.xs};
  }

  ol, ul {
    list-style: inherit;
    padding-left: ${V.Space.default};

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  li {
    &:not(:last-child) {
      margin-bottom: ${V.Space.xs};
    }
  }
`
