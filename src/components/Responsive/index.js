import React from 'react'
import MediaQuery from 'react-responsive'

export const GreaterThanDesktop = ({ children }) => {
  return (
    <MediaQuery minWidth={992}>
      { children }
    </MediaQuery>
  )
}

export const IsTablet = ({ children }) => {
  return (
    <MediaQuery minWidth={768} maxWidth={991}>
      { children }
    </MediaQuery>
  )
}

export const GreaterThanTablet = ({ children }) => {
  return (
    <MediaQuery minWidth={768}>
      { children }
    </MediaQuery>
  )
}

export const LessThenMobile = ({ children }) => {
  return (
    <MediaQuery maxWidth={767}>
      { children }
    </MediaQuery>
  )
}