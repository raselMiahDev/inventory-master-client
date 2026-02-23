'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
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
          Check your email
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          We've sent a password reset link to{' '}
          <span className="font-medium text-emerald-600">{email}</span>
        </p>
        <div className="pt-4">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Info Text */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-9 ${error ? 'border-red-500' : ''}`}
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
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
            Sending...
          </>
        ) : (
          'Send Reset Link'
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