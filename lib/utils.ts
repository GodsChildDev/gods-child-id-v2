
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculate_age(dob  : 
  any // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  // @ts-expect-error: We know 'current' might be null, but we're bypassing for now.
  return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
}

export function format_height(height : string) {
  return height.replace('-', '\'') + '\"';
}

export function capitalize(str : string | undefined) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return as is if not a string or empty
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}