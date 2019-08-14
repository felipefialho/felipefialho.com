import styled from 'styled-components'

import * as V from 'styles/variables'

export const Content = styled.article`
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: -0.04px;
  line-height: 1.58;
  text-rendering: optimizeLegibility;

  h1 {
    color: var(--primaryColor);
    font-size: 4rem;
    line-height: 4.8rem;
    font-family: Georgia, 'Times New Roman', Times, serif;

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    color: var(--secondaryColor);
    font-size: 2.4rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    line-height: 3.2rem;
    letter-spacing: -0.45px;

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    &:not(:first-child) {
      margin-top: ${V.Space.default};
    }
  }

  a {
    color: var(--highlightColor);
    position: relative;
    text-decoration: none;

    &:after {
      border-bottom: transparent solid 1px;
      content: '';
      margin-top: ${V.Space.xxs};
      left: 0;
      position: absolute;
      top: 100%;
      transition: border-color ${V.Transition.default};
      width: 100%;
      will-change: border-color;
    }

    &:hover {
      &:after {
        border-color: var(--highlightColor);
      }
    }
  }

  blockquote {
    font-size: 3rem;
    font-style: italic;
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
    font-size: 1.8rem;
    background: ${V.Color.black};
    border-radius: 2px;
    color: ${V.Color.white};
    padding: ${V.Space.xxs} ${V.Space.xs};
  }

  ol, ul {
    list-style: inherit;
    padding-left: ${V.Space.default};

    &:not(:first-child) {
      margin-top: ${V.Space.default};
    }
  }

  li {
    &:not(:first-child) {
      margin-top: ${V.Space.xs};
    }
  } 
`
