import { sqliteTable as table, AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const users = table(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    firstName: t.text("first_name"),
    lastName: t.text("last_name"),
    email: t.text().notNull(),
    invitee: t.int().references((): AnySQLiteColumn => users.id),
    role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
  },
  (table) => {
    return {
      emailIndex: t.uniqueIndex("email_idx").on(table.email),
    };
  }
);

export const posts = table(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    slug: t.text().$default(() => generateUniqueString(16)),
    title: t.text(),
    ownerId: t.int("owner_id").references(() => users.id),
  },
  (table) => {
    return {
      slugIndex: t.uniqueIndex("slug_idx").on(table.slug),
      titleIndex: t.index("title_idx").on(table.title),
    };
  }
);

export const comments = table("comments", {
  id: t.int().primaryKey({ autoIncrement: true }),
  text: t.text({ length: 256 }),
  postId: t.int("post_id").references(() => posts.id),
  ownerId: t.int("owner_id").references(() => users.id),
});
