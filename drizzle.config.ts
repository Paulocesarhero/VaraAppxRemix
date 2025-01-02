import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schemas/*",
  out: "./src/database/migrations/drizzle",
  dialect: "sqlite",
  driver: "expo", // <--- very important
} satisfies Config;
