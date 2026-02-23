import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function BankDepositStatus() {
  const todayCash = 28450;
  const depositedAmount = 15000;
  const remainingAmount = todayCash - depositedAmount;
  const depositPercentage = (depositedAmount / todayCash) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-emerald-900/50 rounded-lg">
            <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Bank Deposit
          </h2>
        </div>
        <Badge className="bg-amber-500 text-white">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Today's Cash */}
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Today's Cash Collection
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            ₹{todayCash.toLocaleString()}
          </p>
        </div>

        {/* Deposit Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Deposited</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              ₹{depositedAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={depositPercentage} className="h-2 bg-white" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Remaining</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              ₹{remainingAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <ArrowRight className="mr-2 h-4 w-4" /> Mark as Deposited
          </Button>
          
          <Button variant="outline" className="w-full border-emerald-200 hover:bg-emerald-100 dark:border-emerald-800 dark:hover:bg-emerald-900/50">
            <CheckCircle2 className="mr-2 h-4 w-4" /> View Deposit History
          </Button>
        </div>

        {/* Last Deposit Info */}
        <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Last deposit: ₹15,000
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Slip #: HDFC240216-001
          </p>
        </div>
      </div>
    </Card>
  );
}