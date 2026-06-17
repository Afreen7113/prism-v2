import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-border-subtle disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
            {
              'bg-primary text-text-inverse hover:opacity-90': variant === 'primary',
              'bg-bg-surface text-text-primary hover:bg-bg-subtle': variant === 'secondary',
              'border border-border-subtle bg-transparent text-text-primary hover:bg-bg-subtle': variant === 'outline',
              'bg-transparent text-text-primary hover:bg-bg-subtle': variant === 'ghost',
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4 py-2': size === 'md',
              'h-12 px-6 text-lg': size === 'lg',
            },
            className
          )
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

