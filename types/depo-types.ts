export interface ApiDepot {
  _id: string
  name: string
  code: string
  address: string
  contactNumber: string
  contactPerson: string
  stats?: {
    products: number
    totalValue: number
    monthlySales: number
    totalStock: number
  }
  incharges?: ApiInCharge[]
  createdBy: {
    id: string
    username: string
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DepotResponse {
  success: boolean
  data: ApiDepot[]
}

export interface ApiInCharge {
  id: string
  name: string
  email: string
  contactNumber: string
  depotId: string
  isActive: boolean
  createdAt: string
  updatedAt: string 
}