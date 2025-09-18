/**
 * Sanitises the input string to be used as a url parameter.
 * Replaces spaces with "+", and removes special characters.
 * @param str input string
 * @returns sanitised string
 */
export const sanitiseParam = (str: string): string => {
  return str.trim().replace(/\s+/g, '+').replace(/[/&?=:%]/g, '')
}

/**
 * creates a URL-friendly slug
 * @param name 
 * @returns URL-friendly slug
 */
export const createSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
  
