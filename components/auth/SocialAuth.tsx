import { Button } from '@/components/ui/button';
import { Chrome, Github } from 'lucide-react';

export function SocialAuth() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  );
}