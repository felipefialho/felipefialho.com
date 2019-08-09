import React from 'react'

import { ReactComponent as BrandSvg } from './brand.svg';

import * as S from './styled'

const Brand = ({ children }) => {
  return (
    <S.Brand>
      <BrandSvg />
    </S.Brand>
  )
}

export default Brand