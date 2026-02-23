// app/auth/components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
    
    const strength = Object.values(checks).filter(Boolean).length;
    
    return {
      checks,
      strength: strength === 5 ? 'Strong' : strength >= 3 ? 'Medium' : 'Weak',
      color: strength === 5 ? 'text-emerald-600' : strength >= 3 ? 'text-amber-600' : 'text-red-600'
    };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
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
      router.push('/auth/login?registered=true');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className={errors.fullName ? 'border-red-500' : ''}
          disabled={loading}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={errors.username ? 'border-red-500' : ''}
          disabled={loading}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? 'border-red-500' : ''}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
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
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Password strength:</span>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.strength}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full ${
                    level <= Object.values(passwordStrength.checks).filter(Boolean).length
                      ? Object.values(passwordStrength.checks).filter(Boolean).length === 5
                        ? 'bg-emerald-500'
                        : Object.values(passwordStrength.checks).filter(Boolean).length >= 3
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {Object.entries(passwordStrength.checks).map(([key, valid]) => (
                <div key={key} className="flex items-center gap-1 text-xs">
                  {valid ? (
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-slate-400" />
                  )}
                  <span className={valid ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500'}>
                    {key === 'length' && '8+ characters'}
                    {key === 'uppercase' && 'Uppercase letter'}
                    {key === 'lowercase' && 'Lowercase letter'}
                    {key === 'number' && 'Number'}
                    {key === 'special' && 'Special character'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
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

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
          className="mt-1"
        />
        <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
          I agree to the{' '}
          <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
            Privacy Policy
          </Link>
        </Label>
      </div>
      {errors.agreeTerms && (
        <p className="text-xs text-red-500">{errors.agreeTerms}</p>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link 
          href="/auth/login"
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}