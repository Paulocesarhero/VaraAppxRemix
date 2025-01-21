import { drizzle } from "drizzle-orm/expo-sqlite/index";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "../schemas/avisoSchema";
const expo = openDatabaseSync("db.db", { enableChangeListener: true }); // <-- enable change listeners
export const db = drizzle(expo, {
  schema,
});
