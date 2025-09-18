
/**
 * A collection of color values used throughout the application.
 * Each color is represented by a key that describes its appearance.
 * The value is a hexadecimal color code.
 */
export const colorPalette = {
  jasperRed: '#d34437',
  jasperRedLight: '#e66b60',
  irisBlue: '#1c3c89',
  darkBlue: '#10234b',
  bayoux: '#225f7f',
  lynch: '#217798',
  gray: '#6e7e91',
  lightGray: '#e0e0e0',
  catskillWhite: '#caf0f6',
  paleViolet: '#57b8eb',
  linkWater: '#b4f7fc',
  ghostWhite: '#f5f5f5',
  blank: '#ffffff' 
}

export const uiKitColors = {
  input: {
    text: colorPalette.darkBlue,
    placeholder: colorPalette.bayoux,
    background: colorPalette.blank,
    border: colorPalette.lynch,
    hover: {
      background: colorPalette.ghostWhite,
    },
    focus: {
      outline: colorPalette.lynch,
      background: colorPalette.ghostWhite,
    },
    filled: {
      background: colorPalette.ghostWhite,
    }
  },
}

export const themeColor = {
  ...colorPalette,
  ...uiKitColors
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: typeof themeColor;
  }
}
