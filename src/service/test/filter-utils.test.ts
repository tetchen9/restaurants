import { sanitiseParam, filterRestaurantsByNameOrCusine } from '../filter-utils'
import { mockRestaurants } from '@/test/mock-restaurants'

describe('sanitiseParam', () => {
  it('should replace spaces with plus signs and trim the trailing spaces', () => {
    const input = 'Chris Colgan '
    const result = sanitiseParam(input)
    expect(result).toEqual('Chris+Colgan')
  })

  it('should remove special characters', () => {
    const input = '?Chris&='
    const result = sanitiseParam(input)
    expect(result).toEqual('Chris')
  })
})

describe('filterRestaurantsByNameOrCusine', () => {
  it('should return all restaurants when search term is undefined', () => {
    const filterFn = filterRestaurantsByNameOrCusine(undefined)
    const result = filterFn(mockRestaurants)
    
    expect(result).toEqual(mockRestaurants)
    expect(result.length).toBe(3)
  })

  it('should return all restaurants when search term is empty string', () => {
    const filterFn = filterRestaurantsByNameOrCusine('')
    const result = filterFn(mockRestaurants)
    
    expect(result).toEqual(mockRestaurants)
    expect(result.length).toBe(3)
  })

  it('should filter by restaurant name (single term)', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Masala')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Masala Kitchen')
  })

  it('should filter by cuisine (single term)', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Indian')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(2)
    expect(result[0].name).toBe('Masala Kitchen')
  })

  it('should filter by partial name match', () => {
    const filterFn = filterRestaurantsByNameOrCusine('ABC')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('ABC Chicken')
  })

  it('should filter by partial cuisine match', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Contemporary')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('ABC Chicken')
  })

  it('should be case insensitive', () => {
    const filterFn = filterRestaurantsByNameOrCusine('INDIAN')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(2)
    expect(result[1].name).toBe('Vrindavan')
  })

  it('should handle comma-separated values', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Indian, Thai')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(2)
    expect(result.map(r => r.name).sort()).toEqual(['Masala Kitchen', 'Vrindavan'])
  })

  it('should handle comma-separated values with spaces', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Asian, Contemporary, Brazilian')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(2)
    expect(result.map(r => r.name).sort()).toEqual(['ABC Chicken', 'Masala Kitchen'])
  })

  it('should handle mixed name and cuisine search', () => {
    const filterFn = filterRestaurantsByNameOrCusine('ABC, Thai')
    const result = filterFn(mockRestaurants)
    expect(result.length).toBe(1)
    expect(result.map(r => r.name).sort()).toEqual(['ABC Chicken'])
  })

  it('should handle multi-word cuisine names', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Masala Kitchen')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Masala Kitchen')
  })

  it('should handle comma-separated multi-word terms', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Masala Kitchen, Vegetarian')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(1)
    expect(result.map(r => r.name).sort()).toEqual(['Masala Kitchen'])
  })

  it('should return empty array when no matches found', () => {
    const filterFn = filterRestaurantsByNameOrCusine('Pizza')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(0)
    expect(result).toEqual([])
  })

  it('should handle extra spaces and commas', () => {
    const filterFn = filterRestaurantsByNameOrCusine('  Indian  ,  Thai  ,  ')
    const result = filterFn(mockRestaurants)
    
    expect(result.length).toBe(2)
    expect(result.map(r => r.name).sort()).toEqual(['Masala Kitchen', 'Vrindavan'])
  })

  it('should not mutate original data', () => {
    const originalLength = mockRestaurants.length
    const originalFirst = mockRestaurants[0]
    
    const filterFn = filterRestaurantsByNameOrCusine('Asian')
    const result = filterFn(mockRestaurants)
    
    expect(mockRestaurants.length).toBe(originalLength)
    expect(mockRestaurants[0]).toBe(originalFirst)
    expect(result).not.toBe(mockRestaurants)
  })
})
