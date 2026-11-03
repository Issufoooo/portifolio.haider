import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Junta classes Tailwind sem conflitos (usado pelo shadcn/ui e pelo Aceternity). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
