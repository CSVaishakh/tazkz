-- Reconstructed from types/task.ts + app/api/tasks/** usage.
-- No live schema dump was available (the original Supabase project's schema was
-- never version-controlled), so this is a best-effort reconstruction. Column
-- names/casing match exactly what the app already sends/reads over the wire.
-- "childTasks" / "parentTask" are quoted to preserve camelCase, since Postgres
-- folds unquoted identifiers to lowercase.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE parent_tasks (
    id           uuid PRIMARY KEY,
    user_id      text NOT NULL,
    name         text NOT NULL,
    description  text,
    status       text NOT NULL CHECK (status IN ('started', 'ongoing', 'completed')),
    priority     text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    deadline     text,
    "childTasks" text[],
    notes        text[]
);

CREATE TABLE child_tasks (
    id           uuid PRIMARY KEY,
    name         text NOT NULL,
    description  text,
    progress     text,
    deadline     text,
    "parentTask" uuid NOT NULL REFERENCES parent_tasks(id) ON DELETE CASCADE,
    notes        text[]
);

CREATE INDEX idx_parent_tasks_user_id ON parent_tasks(user_id);
CREATE INDEX idx_child_tasks_parent_task ON child_tasks("parentTask");
