import { config } from 'dotenv';

config();

export const {
  ALLOWED_ORIGINS,
  PORT = 4000,
  DB_CONN,
  JWT_SECRET,
} = process.env;
