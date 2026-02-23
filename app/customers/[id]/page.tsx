'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatsCard } from '@/components/ui/stats-card';
import { CustomerTransactionHistory } from '@/components/customers/CustomerTransactionHistory';
import { CustomerLoyaltyCard } from '@/components/customers/CustomerLoyaltyCard';
import { CustomerForm } from '@/components/customers/CustomerForm';
import {
  Mail, Phone, MapPin, Building2, CreditCard,
  Calendar, Edit2, ArrowLeft, Award, Download
} from 'lucide-react';

const mockCustomer = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh.k@example.com',
  phone: '+91 98765 43210',
  address: '123 Main Street, Andheri East',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  gstin: '27ABCDE1234F1Z5',
  customerType: 'wholesale',
  loyaltyPoints: 1250,
  totalPurchases: 45,
  totalSpent: 125000,
  averagePurchase: 2778,
  lastPurchaseDate: '2026-02-15',
  creditLimit: 50000,
  creditBalance: 15000,
  paymentTerms: 'net30',
  status: 'active',
  tags: ['vip', 'regular'],
  notes: 'Preferred customer. Works in textile business.',
  createdAt: '2025-06-15',
  updatedAt: '2026-02-15'
};

const mockTransactions = [
  {
    id: '1',
    date: '2026-02-15',
    invoiceNo: 'INV-2026-001',
    amount: 12500,
    paymentMethod: 'cash',
    items: 5,
    status: 'completed'
  },
  {
    id: '2',
    date: '2026-02-10',
    invoiceNo: 'INV-2026-002',
    amount: 8500,
    paymentMethod: 'card',
    items: 3,
    status: 'completed'
  },
  {
    id: '3',
    date: '2026-02-05',
    invoiceNo: 'INV-2026-003',
    amount: 22000,
    paymentMethod: 'credit',
    items: 8,
    status: 'completed'
  },
  {
    id: '4',
    date: '2026-01-28',
    invoiceNo: 'INV-2026-004',
    amount: 5400,
    paymentMethod: 'upi',
    items: 2,
    status: 'pending'
  }
];

export default function SingleCustomerPage() {
  const { id } = useParams();
  const [editForm, setEditForm] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/customers'}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {mockCustomer.name}
                </h1>
                <StatusBadge status={mockCustomer.status === 'active'} />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  mockCustomer.customerType === 'wholesale' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {mockCustomer.customerType}
                </span>
              </div>
              <p className="text-sm text-slate-500">Customer ID: {id}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                onClick={() => setEditForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Spent"
            value={`₹${mockCustomer.totalSpent.toLocaleString()}`}
            icon={CreditCard}
            color="emerald"
          />
          <StatsCard
            title="Transactions"
            value={mockCustomer.totalPurchases}
            icon={Building2}
            color="blue"
          />
          <StatsCard
            title="Average Purchase"
            value={`₹${mockCustomer.averagePurchase.toLocaleString()}`}
            icon={Calendar}
            color="purple"
          />
          <StatsCard
            title="Loyalty Points"
            value={mockCustomer.loyaltyPoints}
            icon={Award}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{mockCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">{mockCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{mockCustomer.address}</p>
                    <p className="text-sm text-slate-600">
                      {mockCustomer.city}, {mockCustomer.state} - {mockCustomer.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Info Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Business Information</h3>
              <div className="space-y-4">
                {mockCustomer.gstin && (
                  <div>
                    <p className="text-sm text-slate-500">GSTIN</p>
                    <p className="font-medium">{mockCustomer.gstin}</p>
                  </div>
                )}
                {mockCustomer.creditLimit > 0 && (
                  <>
                    <div>
                      <p className="text-sm text-slate-500">Credit Limit</p>
                      <p className="font-medium">₹{mockCustomer.creditLimit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Current Balance</p>
                      <p className="font-medium text-amber-600">₹{mockCustomer.creditBalance.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Payment Terms</p>
                      <p className="font-medium uppercase">{mockCustomer.paymentTerms}</p>
                    </div>
                  </>
                )}
                {mockCustomer.tags && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {mockCustomer.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Loyalty Card */}
            <CustomerLoyaltyCard 
              customer={mockCustomer}
              onRedeem={() => console.log('Redeem points')}
            />
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <CustomerTransactionHistory transactions={mockTransactions} />
              </TabsContent>

              <TabsContent value="invoices">
                <Card className="p-6">
                  <p className="text-center text-slate-500">Invoices will appear here</p>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card className="p-6">
                  <p className="text-center text-slate-500">Activity log will appear here</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Edit Form */}
        <CustomerForm
          open={editForm}
          onClose={() => setEditForm(false)}
          onSubmit={(data) => {
            console.log('Update customer:', data);
            setEditForm(false);
          }}
          initialData={mockCustomer}
          mode="edit"
        />
      </div>
    </div>
  );
}