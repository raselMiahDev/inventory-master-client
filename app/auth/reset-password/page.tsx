// app/auth/reset-password/page.tsx
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}