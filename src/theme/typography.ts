import { css } from 'styled-components'

const rem = (sizeInPX: number) => `${sizeInPX / 16}rem`

function getTextStyles(
  fontWeight: number,
  fontSizeInPX: number,
  lineHeightInPX: number,
) {
  return css`
    font-weight: ${fontWeight};
    font-size: ${rem(fontSizeInPX)};
    line-height: ${rem(lineHeightInPX)};
    margin: 0;
  `
}

export const themeTypography = {
  h1: getTextStyles(500, 26, 32),
  h2: getTextStyles(500, 24, 30),
  h3: getTextStyles(500, 22, 28),

  body: getTextStyles(400, 16, 24),
  bodyMedium: getTextStyles(500, 16, 24),
  bodyBold: getTextStyles(600, 16, 24),

  bodySmall: getTextStyles(400, 12, 16),
  bodySmallMedium: getTextStyles(500, 12, 16),
  bodySmallBold: getTextStyles(600, 12, 16),

  bodyCaption: getTextStyles(400, 10, 16),
}

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: typeof themeTypography;
  }
}
