import type { Config } from "drizzle-kit";

export default {
  schema: "./app/database/schemas/*",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;
