create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text,
  email       text not null,
  company     text,
  revenue     text,
  constraint_ text,
  source      text,
  user_agent  text
);

alter table public.leads enable row level security;

-- No public policies. Writes go through the service role key from the
-- /api/lead route handler only.
