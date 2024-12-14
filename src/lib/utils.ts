import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeCreatedAt(createdAt: number[]): number[] {
  const returnDate = [...createdAt];
  if (createdAt[6]) {
    returnDate.pop();
  }
  returnDate[1] -= 1;

  return returnDate;
}
