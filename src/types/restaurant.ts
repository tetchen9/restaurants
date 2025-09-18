
export interface Deal {
  objectId: string
  discount: string
  dineIn: 'true' | 'false'   
  lightning?: 'true' | 'false' 
  open?: string       
  close?: string      
  qtyLeft: string
  start?: string    
  end?: string      
}

export interface Restaurant {
  objectId: string
  name: string
  address1: string
  suburb: string
  cuisines: string[]
  imageLink: string
  open?: string
  close?: string
  deals: Deal[]
}
