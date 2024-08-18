import * as dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/default';
