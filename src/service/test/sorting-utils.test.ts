import { type Restaurant, Deal } from '@/types/restaurant'
import { sortRestaurantsByBestDeals, getBestDeal } from '../sorting-utils'

  
describe('getBestDeal', () => {
  it('should return the deal with highest discount', () => {
    const deals: Deal[] = [
      { objectId: '1', discount: '10', lightning: 'false', qtyLeft: '5', dineIn: 'true' },
      { objectId: '2', discount: '30', lightning: 'false', qtyLeft: '3', dineIn: 'true' },
      { objectId: '3', discount: '20', lightning: 'false', qtyLeft: '4', dineIn: 'false' }
    ]

    const result = getBestDeal(deals)
    expect(result?.discount).toBe('30')
  })

  it('should prioritize lightning deals over higher discounts', () => {
    const deals: Deal[] = [
      { objectId: '1', discount: '50', lightning: 'false', qtyLeft: '5', dineIn: 'true' },
      { objectId: '2', discount: '20', lightning: 'true', qtyLeft: '3', dineIn: 'false' }
    ]

    const result = getBestDeal(deals)
    expect(result?.lightning).toBe('true')
    expect(result?.discount).toBe('20')
  })

  it('should return highest discount among lightning deals', () => {
    const deals: Deal[] = [
      { objectId: '1', discount: '15', lightning: 'true', qtyLeft: '3', dineIn: 'true' },
      { objectId: '2', discount: '25', lightning: 'true', qtyLeft: '2', dineIn: 'false' },
      { objectId: '3', discount: '10', lightning: 'false', qtyLeft: '5', dineIn: 'true' }
    ]

    const result = getBestDeal(deals) as Deal
    expect(result.lightning).toBe('true')
    expect(result.discount).toBe('25')
  })

  it('should handle single deal', () => {
    const deals: Deal[] = [
      { objectId: '1', discount: '15', lightning: 'false', qtyLeft: '3', dineIn: 'true' }
    ]

    const result = getBestDeal(deals) as Deal
    expect(result.discount).toBe('15')
  })
})

describe('sortRestaurantsByBestDeals', () => {
  const mockRestaurants: Restaurant[] = [
    {
      objectId: '1',
      name: 'Restaurant A',
      address1: '123 Main St',
      suburb: 'Melbourne',
      cuisines: ['Asian'],
      imageLink: 'image1.jpg',
      open: '12:00pm',
      close: '10:00pm',
      deals: [
        { objectId: 'deal1', discount: '20', lightning: 'false', qtyLeft: '5', dineIn: 'true' }
      ]
    },
    {
      objectId: '2',
      name: 'Restaurant B',
      address1: '456 High St', 
      suburb: 'Richmond',
      cuisines: ['Italian'],
      imageLink: 'image2.jpg',
      open: '11:00am',
      close: '11:00pm',
      deals: [
        { objectId: 'deal2', discount: '30', lightning: 'false', qtyLeft: '3', dineIn: 'false' }
      ]
    },
    {
      objectId: '3',
      name: 'Restaurant C',
      address1: '789 Smith St',
      suburb: 'Collingwood', 
      cuisines: ['Thai'],
      imageLink: 'image3.jpg',
      open: '5:00pm',
      close: '9:00pm',
      deals: [
        { objectId: 'deal3', discount: '10', lightning: 'true', qtyLeft: '2', dineIn: 'true' }
      ]
    }
  ]

  it('should sort lightning deals first', () => {
    const sorted = sortRestaurantsByBestDeals([...mockRestaurants])
    
    expect(sorted[0].name).toBe('Restaurant C')
    expect(sorted[1].name).toBe('Restaurant B')
    expect(sorted[2].name).toBe('Restaurant A')
  })

  it('should sort by highest discount when no lightning deals', () => {
    const restaurants: Restaurant[] = [
      {
        objectId: '1',
        name: 'Low Discount',
        address1: '123 St',
        suburb: 'Melbourne', 
        cuisines: ['Food'],
        imageLink: 'img.jpg',
        open: '12pm',
        close: '10pm',
        deals: [{ objectId: 'd1', discount: '10', lightning: 'false', qtyLeft: '5', dineIn: 'true' }]
      },
      {
        objectId: '2',
        name: 'High Discount',
        address1: '456 St',
        suburb: 'Richmond',
        cuisines: ['Food'], 
        imageLink: 'img2.jpg',
        open: '11am',
        close: '11pm',
        deals: [{ objectId: 'd2', discount: '40', lightning: 'false', qtyLeft: '3', dineIn: 'false' }]
      }
    ]

    const sorted = sortRestaurantsByBestDeals([...restaurants])
    
    expect(sorted[0].name).toBe('High Discount')
    expect(sorted[1].name).toBe('Low Discount')
  })

  it('should handle restaurants with multiple deals', () => {
    const restaurants: Restaurant[] = [
      {
        objectId: '1',
        name: 'Multi Deal Restaurant', 
        address1: '123 St',
        suburb: 'Melbourne',
        cuisines: ['Food'],
        imageLink: 'img.jpg',
        open: '12pm',
        close: '10pm',
        deals: [
          { objectId: 'd1', discount: '10', lightning: 'false', qtyLeft: '5', dineIn: 'true' },
          { objectId: 'd2', discount: '30', lightning: 'true', qtyLeft: '2', dineIn: 'false' },
          { objectId: 'd3', discount: '20', lightning: 'false', qtyLeft: '3', dineIn: 'true' }
        ]
      },
      {
        objectId: '2',
        name: 'Single Deal Restaurant',
        address1: '456 St', 
        suburb: 'Richmond',
        cuisines: ['Food'],
        imageLink: 'img2.jpg',
        open: '11am',
        close: '11pm',
        deals: [
          { objectId: 'd4', discount: '25', lightning: 'false', qtyLeft: '4', dineIn: 'false' }
        ]
      }
    ]

    const sorted = sortRestaurantsByBestDeals([...restaurants])

    expect(sorted[0].name).toBe('Multi Deal Restaurant')
  })

  it('should not mutate original array', () => {
    const original = [...mockRestaurants]
    const sorted = sortRestaurantsByBestDeals([...mockRestaurants])
    
    expect(original).toEqual(mockRestaurants)
    expect(sorted).not.toBe(mockRestaurants)
  })

  it('should handle empty restaurants array', () => {
    const result = sortRestaurantsByBestDeals([])
    expect(result).toEqual([])
  })
})
