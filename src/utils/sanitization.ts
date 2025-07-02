
// Utility functions for input sanitization and validation

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (!input) return '';
  
  // Basic HTML entity encoding
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitizes text input by removing potentially dangerous characters
 */
export const sanitizeText = (input: string): string => {
  if (!input) return '';
  
  // Remove null bytes and control characters except newlines and tabs
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Validates and sanitizes email addresses
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Basic email sanitization - remove dangerous characters
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>"\s]/g, '');
};

/**
 * Sanitizes user-generated content for database storage
 */
export const sanitizeUserContent = (content: string): string => {
  if (!content) return '';
  
  // Sanitize HTML and remove control characters
  return sanitizeHtml(sanitizeText(content.trim()));
};

/**
 * Rate limiting helper - simple in-memory store
 * In production, use Redis or similar
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false;
  }
  
  entry.count++;
  return true;
};
