/**
 * Sanitises the input string to be used as a url parameter.
 * Replaces spaces with "+", and removes special characters.
 * @param str input string
 * @returns sanitised string
 */
export const sanitiseParam = (str: string): string => {
  return str.trim().replace(/\s+/g, '+').replace(/[/&?=:%]/g, '')
}
