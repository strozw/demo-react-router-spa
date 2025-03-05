import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export const dbUrl = process.env.DB_FILE_NAME ?? "file:local.db";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbUrl,
  },
});
