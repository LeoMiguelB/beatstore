import { pgTable, pgEnum, bigint, text, timestamp, serial, varchar, smallint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const requestStatus = pgEnum("request_status", ['ERROR', 'SUCCESS', 'PENDING'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const emails = pgTable("emails", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	email: text("email"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const audioTb = pgTable("audio_tb", {
	id: serial("id").primaryKey().notNull(),
	title: text("title"),
	songKey: varchar("song_key", { length: 25 }),
	producer: text("producer"),
	bpm: smallint("bpm"),
	srcLink: text("src_link"),
	imgLink: text("img_link"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});