import { z } from 'zod';
import { BLOOD_GROUPS } from './constants';

// Email Validator
export const emailValidator = z
  .string()
  .email('Invalid email address')
  .min(5, 'Email is too short')
  .max(100, 'Email is too long');

// Password Validator
export const passwordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    'Password must contain at least one special character'
  );

// Phone Validator
export const phoneValidator = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Invalid phone number (must start with 6-9 and be 10 digits)');

// Blood Group Validator
export const bloodGroupValidator = z.enum(BLOOD_GROUPS, {
  errorMap: () => ({ message: 'Invalid blood group' }),
});

// Pincode Validator
export const pincodeValidator = z
  .string()
  .regex(/^\d{6}$/, 'Invalid pincode (must be 6 digits)');

// Name Validator
export const nameValidator = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

// Date Validator
export const dateValidator = z.string().refine((date) => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}, 'Invalid date');

// Age Validator
export const ageValidator = (minAge: number = 18, maxAge: number = 65) => {
  return z.string().refine(
    (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge && age <= maxAge;
    },
    `Age must be between ${minAge} and ${maxAge} years`
  );
};

// URL Validator
export const urlValidator = z.string().url('Invalid URL');

// Number Range Validator
export const numberRangeValidator = (min: number, max: number, fieldName: string = 'Value') => {
  return z
    .number()
    .min(min, `${fieldName} must be at least ${min}`)
    .max(max, `${fieldName} must be at most ${max}`);
};

// Text Length Validator
export const textLengthValidator = (min: number, max: number, fieldName: string = 'Text') => {
  return z
    .string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);
};

// Custom Validators
export const isValidEmail = (email: string): boolean => {
  return emailValidator.safeParse(email).success;
};

export const isValidPhone = (phone: string): boolean => {
  return phoneValidator.safeParse(phone).success;
};

export const isValidPassword = (password: string): boolean => {
  return passwordValidator.safeParse(password).success;
};

export const isValidPincode = (pincode: string): boolean => {
  return pincodeValidator.safeParse(pincode).success;
};

export const isValidBloodGroup = (bloodGroup: string): boolean => {
  return bloodGroupValidator.safeParse(bloodGroup).success;
};

// Sanitization
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const sanitizeHTML = (html: string): string => {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Form Validators
export const getPasswordStrength = (password: string): {
  strength: number;
  label: string;
  color: string;
} => {
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    strength += 25;

  let label = 'Weak';
  let color = '#ef4444';

  if (strength >= 50 && strength < 75) {
    label = 'Medium';
    color = '#f59e0b';
  } else if (strength >= 75) {
    label = 'Strong';
    color = '#10b981';
  }

  return { strength, label, color };
};
