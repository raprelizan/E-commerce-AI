import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-md px-4 py-2', className)} {...props} />;
}
