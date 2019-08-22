import styled from 'styled-components'
import { Tag } from 'styled-icons/boxicons-regular/Tag'

import * as V from 'styles/variables'

export const Tags = styled.div`
  align-items: center;
  color: var(--secondaryColor);
  display: flex;
`

export const TagItem = styled.span`
  align-items: center;
  display: inline-flex;
  font-size: 1.2rem;
  height: ${V.Space.sm};
  letter-spacing: .1rem;
  text-transform: lowercase;

  &:not(:last-child) {
    margin-right: ${V.Space.xxs};

    &:after {
      content: ', '
    }
  }
`

export const TagIcon = styled(Tag)`
  display: block;
  height: ${V.Space.sm};
  margin-right: ${V.Space.xs};
  width: ${V.Space.sm};
`
