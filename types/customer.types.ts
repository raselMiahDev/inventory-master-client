export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstin?: string;
  customerType: 'retail' | 'wholesale' | 'distributor';
  loyaltyPoints: number;
  totalPurchases: number;
  totalSpent: number;
  lastPurchaseDate?: string;
  creditLimit?: number;
  creditBalance?: number;
  paymentTerms?: string;
  status: 'active' | 'inactive' | 'blocked';
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerTransaction {
  id: string;
  date: string;
  invoiceNo: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'upi' | 'credit';
  items: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  wholesaleCustomers: number;
  retailCustomers: number;
  averagePurchase: number;
  totalRevenue: number;
  topCustomers: Array<{
    id: string;
    name: string;
    totalSpent: number;
  }>;
}

export interface CustomerFilters {
  search: string;
  type: string;
  status: string;
  city?: string;
  minPurchase?: number;
  maxPurchase?: number;
  dateRange?: {
    from: string;
    to: string;
  };
}