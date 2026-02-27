
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MapPin, Phone, User, Package, Eye } from 'lucide-react';

interface DepotCardProps {
  depot: {
    id: string;
    name: string;
    code: string;
    address: string;
    contactPerson: string;
    contactNumber: string;
    isActive: boolean;
    stats?: {
      products: number;
      value: number;
    };
  };
  onView?: (id: string) => void;
}



export function DepotCard({ depot, onView }: DepotCardProps) {

  
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {depot.name}
            </h3>
            <StatusBadge status={depot.isActive} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Code: {depot.code}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-400">{depot.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-400">{depot.contactPerson}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-400">{depot.contactNumber}</span>
        </div>
      </div>

      {depot.stats && (
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-500">Products</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{depot.stats.products}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Stock Value</p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              ₹{depot.stats.value.toLocaleString()}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto"
            onClick={() => onView?.(depot.id)}
          >
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
        </div>
      )}
    </Card>
  );
}