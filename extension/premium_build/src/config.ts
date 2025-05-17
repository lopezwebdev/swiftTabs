// This file should be gitignored and replaced with a template in production
export const config = {
  API_URL: process.env.API_URL || 'https://api.swifttabs.com',
  API_KEY: process.env.API_KEY || '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
  ENVIRONMENT: process.env.NODE_ENV || 'development'
}; 