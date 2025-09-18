import { ReactElement, ReactNode } from 'react'
import type { DefaultTheme } from 'styled-components'
import {
  ThemeProvider as Provider,
  createGlobalStyle,
} from 'styled-components'
import { normalize } from 'styled-normalize'
import { themeColor } from './color'
import { themeSpace } from './spacing'
import { themeTypography } from './typography'
import { themeDevice } from './mediaquery'

const theme: DefaultTheme = {
  typography: themeTypography,
  color: themeColor,
  space: themeSpace,
  device: themeDevice,
}

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Creo ExtraBold';
    src: url("src/theme/fonts/Creo-ExtraBold.ttf") format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Creo ExtraLight';
    src: url("src/theme/fonts/Creo-ExtraLight.ttf") format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  
  :root {
    --font-primary: sans-serif;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: var(--font-primary);
    ${({ theme }) => theme.typography.body};
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    color:${({ theme }) => theme.color.darkBlue};
    background-color:${({ theme }) => theme.color.ghostWhite};
  }
`

export const ThemeProvider = (props: { children: ReactNode }): ReactElement => {
  const { children } = props

  return (
    <Provider theme={theme}>
      <GlobalStyle />
      {children}
    </Provider>
  )
}
