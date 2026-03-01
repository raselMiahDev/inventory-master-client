export interface IProduct {
  id: string;
  name: string;
  code: string;
  packSize: number;
  unitPrice: number;
  description: string;
  category: string;
  isActive: boolean;
  createdBy:string | object;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsResponse {
  success: boolean
  data: IProduct[]
}