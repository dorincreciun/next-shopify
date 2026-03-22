-- users.id was created as INTEGER NOT NULL without DEFAULT; inserts failed with NOT NULL on id.
CREATE SEQUENCE IF NOT EXISTS "users_id_seq";
SELECT CASE
    WHEN (SELECT MAX("id") FROM "users") IS NULL THEN setval('"users_id_seq"', 1, false)
    ELSE setval('"users_id_seq"', (SELECT MAX("id") FROM "users"), true)
END;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"');
ALTER SEQUENCE "users_id_seq" OWNED BY "users"."id";
