-- ============================================================
-- NEON RUNNER MISSION BOARD — DATABASE SETUP
-- Run this once in the Supabase SQL Editor (copy → paste → Run)
-- ============================================================

-- TABLES

CREATE TABLE IF NOT EXISTS users (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username   TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS missions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id   TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  category     TEXT NOT NULL CHECK (category IN ('default', 'detective', 'unlocked')),
  difficulty   TEXT NOT NULL,
  badge        TEXT,
  what_you_learn TEXT,
  steps        TEXT[],
  claimed_by   TEXT,
  claimed_at   TIMESTAMP WITH TIME ZONE,
  completed_by TEXT[] DEFAULT '{}',
  evidence     TEXT,
  story_part   TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username   TEXT NOT NULL,
  score      INTEGER NOT NULL,
  game_time  REAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES

CREATE INDEX IF NOT EXISTS idx_missions_mission_id ON missions(mission_id);
CREATE INDEX IF NOT EXISTS idx_missions_category    ON missions(category);
CREATE INDEX IF NOT EXISTS idx_users_username       ON users(username);
CREATE INDEX IF NOT EXISTS idx_scores_score         ON scores(score DESC);

-- ROW LEVEL SECURITY

ALTER TABLE users    ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores   ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies before recreating
DROP POLICY IF EXISTS "Allow all operations on users"    ON users;
DROP POLICY IF EXISTS "Allow all operations on missions" ON missions;
DROP POLICY IF EXISTS "Anyone can insert scores"         ON scores;
DROP POLICY IF EXISTS "Anyone can read scores"           ON scores;

CREATE POLICY "Allow all operations on users"    ON users    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on missions" ON missions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can insert scores"         ON scores   FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read scores"           ON scores   FOR SELECT USING (true);

-- DONE — verify with:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
