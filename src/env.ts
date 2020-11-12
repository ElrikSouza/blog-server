import { config } from 'dotenv';

config();

export const {
  ALLOWED_ORIGINS,
  PORT = 4000,
  DB_CONN,
  JWT_SECRET,
  RATE_LIMIT_WINDOW = '900000',
  RATE_LIMIT_MAX = '100',
} = process.env;
