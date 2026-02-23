import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, Gift, TrendingUp } from 'lucide-react';

interface CustomerLoyaltyCardProps {
  customer: {
    name: string;
    loyaltyPoints: number;
    totalSpent: number;
    averagePurchase: number;
  };
  onRedeem?: () => void;
}

export function CustomerLoyaltyCard({ customer, onRedeem }: CustomerLoyaltyCardProps) {
  const nextTierPoints = 1000;
  const pointsToNextTier = Math.max(0, nextTierPoints - customer.loyaltyPoints);
  const progress = (customer.loyaltyPoints / nextTierPoints) * 100;

  const getTier = (points: number) => {
    if (points >= 5000) return { name: 'Platinum', color: 'text-purple-600' };
    if (points >= 2000) return { name: 'Gold', color: 'text-amber-600' };
    if (points >= 1000) return { name: 'Silver', color: 'text-slate-600' };
    return { name: 'Bronze', color: 'text-amber-800' };
  };

  const tier = getTier(customer.loyaltyPoints);

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 rounded-lg">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Loyalty Program
            </h3>
            <p className={`text-sm font-medium ${tier.color}`}>
              {tier.name} Member
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
          {customer.loyaltyPoints}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Loyalty Points</p>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Progress to Silver</span>
          <span className="font-medium">{customer.loyaltyPoints} / {nextTierPoints}</span>
        </div>
        <Progress value={progress} className="h-2 bg-white" />
        <p className="text-xs text-slate-500">
          {pointsToNextTier} more points to reach Silver tier
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-500">Total Spent</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            ₹{customer.totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-500">Avg. Purchase</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            ₹{customer.averagePurchase.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
          onClick={onRedeem}
        >
          <Gift className="mr-2 h-4 w-4" />
          Redeem Points
        </Button>
        <Button variant="outline" className="flex-1">
          <TrendingUp className="mr-2 h-4 w-4" />
          View History
        </Button>
      </div>
    </Card>
  );
}