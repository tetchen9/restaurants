
/**
 * A collection of color values used throughout the application.
 * Each color is represented by a key that describes its appearance.
 * The value is a hexadecimal color code.
 */
export const colorPalette = {
  irisBlue: '#1c3c89',
  darkBlue: '#10234b',
  bayoux: '#225f7f',
  lynch: '#217798',
  catskillWhite: '#caf0f6',
  paleViolet: '#57b8eb',
  linkWater: '#b4f7fc',
  ghostWhite: '#b9faff',
  blank: '#ffffff'
}

export const uiKitColors = {
  input: {
    text: colorPalette.darkBlue,
    placeholder: colorPalette.bayoux,
    background: colorPalette.blank,
    border: colorPalette.lynch,
    hover: {
      background: colorPalette.catskillWhite,
    },
    focus: {
      outline: colorPalette.lynch,
      background: colorPalette.catskillWhite,
    },
    filled: {
      background: colorPalette.catskillWhite,
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
