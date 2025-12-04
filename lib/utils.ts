
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

export function hideContactInfo(type: string, value: string) {
  if (value?.length) {
    if (type === 'Text') {
      return value.slice(0,2) + '-xxx-xxx-' + value.slice(value.length - 4)
    } else {
      return value.split('@')[0].slice(0,2) + '********' + value.split('@')[1];
    }
  }
  return '';
}

export function generateSigninCode() {
    const characters = '0123456789';
    const minLength = 6;
    const maxLength = 6;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };