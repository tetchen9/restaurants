
export interface Deal {
  objectId: string
  discount: string
  dineIn: string  // could be "true" or "false" as string per example
  lightning?: string  // optional because not all deals have this field
  open?: string       // optional because some deals are missing it
  close?: string      // optional
  qtyLeft: string
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
