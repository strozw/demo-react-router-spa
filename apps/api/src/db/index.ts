import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { dbUrl } from "../../drizzle.config"

export const db = drizzle(dbUrl);
