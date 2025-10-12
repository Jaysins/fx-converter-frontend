/**
 * Validation utilities for forms
 */

export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password strength validation
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  message: string;
} {
  if (password.length < 8) {
    return {
      isValid: false,
      strength: 'weak',
      message: 'Password must be at least 8 characters',
    };
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;

  // Check for different character types
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score >= 3 && password.length >= 12) {
    strength = 'strong';
  } else if (score >= 2 && password.length >= 8) {
    strength = 'medium';
  }

  return {
    isValid: true,
    strength,
    message: `Password strength: ${strength}`,
  };
}

/**
 * Generic field validator
 */
export function validateField(
  value: any,
  rules: ValidationRule[]
): string | null {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
}

/**
 * Required field validator
 */
export const required = (fieldName: string): ValidationRule => ({
  validate: (value) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },
  message: `${fieldName} is required`,
});

/**
 * Min length validator
 */
export const minLength = (length: number, fieldName: string): ValidationRule => ({
  validate: (value) => {
    if (typeof value === 'string') {
      return value.length >= length;
    }
    return true;
  },
  message: `${fieldName} must be at least ${length} characters`,
});

/**
 * Max length validator
 */
export const maxLength = (length: number, fieldName: string): ValidationRule => ({
  validate: (value) => {
    if (typeof value === 'string') {
      return value.length <= length;
    }
    return true;
  },
  message: `${fieldName} must not exceed ${length} characters`,
});

/**
 * Number range validator
 */
export const numberRange = (
  min: number, 
  max: number, 
  fieldName: string
): ValidationRule => ({
  validate: (value) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },
  message: `${fieldName} must be between ${min} and ${max}`,
});

/**
 * Email validator
 */
export const email = (fieldName: string): ValidationRule => ({
  validate: (value) => isValidEmail(value),
  message: `${fieldName} must be a valid email address`,
});

/**
 * Match field validator (for password confirmation)
 */
export const matchesField = (
  otherValue: any,
  fieldName: string,
  otherFieldName: string
): ValidationRule => ({
  validate: (value) => value === otherValue,
  message: `${fieldName} must match ${otherFieldName}`,
});