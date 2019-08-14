import styled from 'styled-components'

import * as V from 'styles/variables'

export const Content = styled.article`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.04px;
  line-height: 1.58;
  text-rendering: optimizeLegibility;

  h1 {
    color: var(--primaryColor);
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 4rem;
    line-height: 4.8rem;

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    color: var(--secondaryColor);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2.4rem;
    letter-spacing: -0.45px;
    line-height: 3.2rem;

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

    &:after {
      border-bottom: transparent solid 1px;
      content: '';
      left: 0;
      margin-top: ${V.Space.xxs};
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
