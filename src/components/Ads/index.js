import React from 'react'

import * as S from './styled'

const GoogleAds = ({ slot, layout = 'image' }) => (
  <>
    <S.AdsGoogle>
      {layout === 'image' ? (
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-adtest={process.env.NODE_ENV !== 'production'}
          data-ad-client='ca-pub-8323225338546238'
          data-ad-slot={slot}
          data-ad-format='auto'
          data-full-width-responsive='true'></ins>
      ) : (
        <ins className='adsbygoogle'
          style={{ display: 'block', 'textAlign': 'center' }}
          data-adtest={process.env.NODE_ENV !== 'production'}
          data-ad-layout='in-article'
          data-ad-format='fluid'
          data-ad-client='ca-pub-8323225338546238'
          data-ad-slot={slot}></ins>
      )}
    </S.AdsGoogle>
  </>
)

export default GoogleAds
