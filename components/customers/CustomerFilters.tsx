'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Label } from '../ui/label';

interface CustomerFiltersProps {
  filters: {
    search: string;
    type: string;
    status: string;
    city?: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
  cities?: string[];
}

export function CustomerFilters({ filters, onFilterChange, onClear, cities = [] }: CustomerFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-3">
      {/* Basic Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, phone..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Select value={filters.type} onValueChange={(value) => onFilterChange('type', value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="wholesale">Wholesale</SelectItem>
            <SelectItem value="distributor">Distributor</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={showAdvanced ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}
        >
          <Filter className="h-4 w-4" />
        </Button>

        {(filters.search || filters.type !== 'all' || filters.status !== 'all' || filters.city) && (
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium mb-3">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">City</Label>
              <Select value={filters.city || 'all'} onValueChange={(value) => onFilterChange('city', value === 'all' ? '' : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Min Purchase</Label>
              <Input
                type="number"
                placeholder="Min amount"
                onChange={(e) => onFilterChange('minPurchase', e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs">Max Purchase</Label>
              <Input
                type="number"
                placeholder="Max amount"
                onChange={(e) => onFilterChange('maxPurchase', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}