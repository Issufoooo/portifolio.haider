import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn/ui — Badge, com as variantes da tua paleta azul.
const badgeVariants = cva(
  'inline-flex items-center font-semibold transition-colors',
  {
    variants: {
      variant: {
        soft: 'rounded-md px-2.5 py-0.5 text-xs bg-primary/10 text-secondary border border-primary/20',
        pill: 'rounded-full px-2.5 py-1 text-xs bg-primary/12 text-primary border border-primary/25',
      },
    },
    defaultVariants: { variant: 'soft' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
