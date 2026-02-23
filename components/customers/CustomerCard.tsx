// app/customers/components/CustomerCard.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Award, ShoppingBag, Eye, Edit2 } from 'lucide-react';

interface CustomerCardProps {
  customer: any;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export function CustomerCard({ customer, onView, onEdit }: CustomerCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      wholesale: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      retail: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      distributor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[type as keyof typeof colors] || colors.retail;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30">
            <AvatarFallback className="text-emerald-600 dark:text-emerald-400 text-lg font-medium">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {customer.name}
              </h3>
              <StatusBadge status={customer.status === 'active'} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(customer.customerType)}`}>
              {customer.customerType}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-400">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-400">{customer.phone}</span>
        </div>
        {customer.city && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">{customer.city}, {customer.state}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div>
          <p className="text-xs text-slate-500">Total Spent</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            ₹{customer.totalSpent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Transactions</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            {customer.totalPurchases}
          </p>
        </div>
      </div>

      {customer.loyaltyPoints > 0 && (
        <div className="mt-3 flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg">
          <Award className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-700 dark:text-amber-400">
            {customer.loyaltyPoints} Loyalty Points
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onView(customer.id)}
        >
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onEdit(customer.id)}
        >
          <Edit2 className="h-4 w-4 mr-1" /> Edit
        </Button>
      </div>
    </Card>
  );
}