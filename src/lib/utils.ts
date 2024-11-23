import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeCreatedAt(createdAt: number[]): number[] {
  if (createdAt[6]) {
    createdAt[6] = 0;
  }

  return createdAt;
}
