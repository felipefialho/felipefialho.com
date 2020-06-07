import styled from 'styled-components'

import * as V from 'styles/variables'

export const ToggleTheme = styled.button.attrs(({ active }) => ({
  'title': active ? 'Mudar para tema escuro' : 'Mudar para tema claro',
  'role': 'button',
  'aria-pressed': !active
}))`
  --toggleBar-size: 5rem;
  background-color: ${V.Color.grayDark};
  border-radius: ${V.Space.default};
  cursor: pointer;
  display: inline-block;
  height: ${V.Space.default};
  position: relative;
  width: var(--toggleBar-size);

  &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    font-size: 18px;
    position: absolute;
    top: -2px;
    z-index: ${V.ZIndex.default}
  }

  &:before {
    content: '🌜';
    left: 2px;
  }

  &:after {
    content: '🌞';
    right: 4px;
  }
`

export const ToggleThemeTrack = styled.div`
  --toggleTrack-size: 22px;
  background-color: ${V.Color.grayWhite};
  border: ${V.Color.blue} solid 2px;
  border-radius: 50%;
  height: var(--toggleTrack-size);
  position: absolute;
  top: 1px;
  transition: transform ${V.Transition.default};
  width: var(--toggleTrack-size);
  z-index: ${V.ZIndex.header};

  .theme-light & {
    transform: translateX(0);
  }

  .theme-dark & {
    transform: translateX(calc(var(--toggleBar-size) - 100%));
  }
`
