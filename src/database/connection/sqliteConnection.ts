import { drizzle } from "drizzle-orm/expo-sqlite/index";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("db.db", { enableChangeListener: true }); // <-- enable change listeners
export const db = drizzle(expo);
