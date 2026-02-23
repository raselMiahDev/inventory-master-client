// app/depots/components/InchargeForm.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InchargeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  depots: Array<{ id: string; name: string; code: string }>;
}

export function InchargeForm({ open, onClose, onSubmit, depots }: InchargeFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    depotId: '',
    role: 'in_charge'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.depotId) newErrors.depotId = 'Please select a depot';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      username: formData.username,
      password: formData.password,
      role: 'in_charge',
      depotId: formData.depotId
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Depot In-charge</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="john.doe"
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="depot">Assign Depot</Label>
            <Select 
              value={formData.depotId} 
              onValueChange={(value) => setFormData({ ...formData, depotId: value })}
            >
              <SelectTrigger className={errors.depotId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a depot" />
              </SelectTrigger>
              <SelectContent>
                {depots.map((depot) => (
                  <SelectItem key={depot.id} value={depot.id}>
                    {depot.name} ({depot.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.depotId && <p className="text-xs text-red-500">{errors.depotId}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create In-charge
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}