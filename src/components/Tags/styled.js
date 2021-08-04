import styled from 'styled-components'
import { Tag } from '@styled-icons/boxicons-regular/Tag'

import * as V from 'styles/variables'

export const Tags = styled.div`
  align-items: center;
  color: var(--primaryColor);
  display: flex;
  flex-wrap: wrap;

  &:not(:last-child) {
    margin-bottom: ${V.Space.xs};
  }
`

export const TagHolder = styled.span`
  align-items: center;
  display: inline-flex;

  > a {
    align-items: center;
    color: var(--primaryColor);
    display: inline-flex;
    transition: color ${V.Transition.default};
    will-change: color;

    &:not(:last-child) {
      margin-right: ${V.Space.xxs};
    }

    &:hover,
    &:focus {
      color: var(--highlightColor);
    }
  }

  &:not(:last-child) {
    margin-right: ${V.Space.xxs};

    &:after {
      content: ', ';
      height: 3rem;
    }
  }
`

export const TagItem = styled.span`
  align-items: center;
  display: inline-flex;
  font-size: 1.3rem;
  letter-spacing: .1rem;
  text-transform: lowercase;
  vertical-align: top;
`

export const TagIcon = styled(Tag)`
  display: block;
  margin-right: ${V.Space.xs};
  width: ${V.Space.sm};
`

