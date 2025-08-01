export const sanitizeText = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove potential XSS patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/style\s*=/gi, '')
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }
  
  // Basic email sanitization - remove dangerous characters
  return email
    .toLowerCase()
    .replace(/[<>'"]/g, '')
    .trim();
};

export const sanitizePhoneNumber = (phone: string): string => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  
  // Keep only numbers, spaces, hyphens, parentheses, and plus sign
  return phone.replace(/[^0-9\s\-\(\)\+]/g, '').trim();
};

export const validateBusinessType = (businessType: string): boolean => {
  const allowedTypes = [
    'trading_mentor',
    'med_spa',
    'fitness_influencer',
    'real_estate',
    'course_creator',
    'other'
  ];
  
  return allowedTypes.includes(businessType.toLowerCase());
};

export const sanitizeUserContent = (input: string): string => {
  return sanitizeText(input);
};

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, number[]>();

export const checkRateLimit = (userId: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const userRequests = rateLimitStore.get(userId) || [];
  
  // Filter out requests outside the window
  const recentRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(userId, recentRequests);
  
  return true;
};
