import { type Restaurant } from '@/types/restaurant'

export const mockRestaurants: Restaurant[] = [
  {
    objectId: 'DEA567C5-F64C-3C03-FF00-E3B24909BE00',
    name: 'Masala Kitchen',
    address1: '55 Walsh Street',
    suburb: 'Lower East',
    cuisines: [ 'Indian', 'Brazilian', 'Breakfast' ],
    imageLink: '',
    open: '3:00pm',
    close: '9:00pm',
    deals: []
  },
  {
    objectId: 'D80263E8-FD89-2C70-FF6B-D854ADB8DB00',
    name: 'ABC Chicken',
    address1: '361 Queen Street',
    suburb: 'Melbourne',
    cuisines: [ 'Contemporary' ],
    imageLink: '',
    open: '12:00pm',
    close: '11:00pm',
    deals: []
  },
  {
    objectId: 'CDB2B42A-248C-EE20-FF45-8D0A8057E200',
    name: 'Vrindavan',
    address1: '261 Harris Street',
    suburb: 'Pyrmont',
    cuisines: [ 'Indian' ],
    imageLink: 'https://dinnerdeal.backendless.com:443/api/e14e5098-2393-6d4a-ff80-f5564e042100/v1/files/restaurant_images/CDB2B42A-248C-EE20-FF45-8D0A8057E200_image_0_1602832133.jpg',
    open: '6:00pm',
    close: '9:00pm',
    deals: []
  }
] 
