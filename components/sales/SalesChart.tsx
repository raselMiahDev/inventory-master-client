// app/sales/components/SalesChart.tsx
'use client';

import { Card } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', sales: 42000, transactions: 28 },
  { day: 'Tue', sales: 38000, transactions: 24 },
  { day: 'Wed', sales: 45000, transactions: 32 },
  { day: 'Thu', sales: 52000, transactions: 36 },
  { day: 'Fri', sales: 48000, transactions: 31 },
  { day: 'Sat', sales: 58000, transactions: 42 },
  { day: 'Sun', sales: 35000, transactions: 22 },
];

export function SalesChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Sales Trend (Last 7 Days)
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Transactions</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis 
              dataKey="day" 
              className="text-xs fill-slate-500"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              yAxisId="left"
              className="text-xs fill-slate-500"
              tick={{ fill: 'currentColor' }}
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              className="text-xs fill-slate-500"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorSales)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorTransactions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}