'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

export function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <CheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Password Reset Successful
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your password has been reset successfully. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Info Text */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Enter your new password below.
        </p>
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Password must contain:
        </p>
        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
          <li className={formData.password.length >= 8 ? 'text-emerald-600' : ''}>
            At least 8 characters
          </li>
          <li className={/[A-Z]/.test(formData.password) ? 'text-emerald-600' : ''}>
            One uppercase letter
          </li>
          <li className={/[a-z]/.test(formData.password) ? 'text-emerald-600' : ''}>
            One lowercase letter
          </li>
          <li className={/[0-9]/.test(formData.password) ? 'text-emerald-600' : ''}>
            One number
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>

      {/* Back to Login */}
      <p className="text-center text-sm">
        <Link 
          href="/auth/login"
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
        >
          ← Back to Login
        </Link>
      </p>
    </form>
  );
}