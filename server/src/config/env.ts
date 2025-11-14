import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.string().default('587'),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),
  EMAIL_FROM: z.string().email(),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  SOCKET_CORS_ORIGIN: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error('');
  
  const errors = parsed.error.format();
  Object.keys(errors).forEach((key) => {
    if (key !== '_errors') {
      const fieldErrors = errors[key as keyof typeof errors];
      if (fieldErrors && '_errors' in fieldErrors) {
        console.error(`   ${key}: ${(fieldErrors as any)._errors.join(', ')}`);
      }
    }
  });
  
  console.error('');
  console.error('💡 Missing or invalid environment variables detected.');
  console.error('   Please check your .env file in the server directory.');
  console.error('   Required variables:');
  console.error('   - MONGODB_URI (e.g., mongodb://localhost:27017/bdms)');
  console.error('   - CLIENT_URL (e.g., http://localhost:3000)');
  console.error('   - JWT_ACCESS_SECRET (minimum 32 characters)');
  console.error('   - JWT_REFRESH_SECRET (minimum 32 characters)');
  console.error('   - EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_FROM');
  console.error('   - SOCKET_CORS_ORIGIN (e.g., http://localhost:3000)');
  console.error('');
  console.error('   See DATABASE_SETUP.md for a complete .env template.');
  console.error('');
  
  process.exit(1);
}

export const env = parsed.data;
