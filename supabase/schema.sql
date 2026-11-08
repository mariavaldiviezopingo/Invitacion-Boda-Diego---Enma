create extension if not exists pgcrypto;
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  name text not null,
  passes integer not null default 1 check (passes > 0),
  status text not null default 'pending' check (status in ('pending','confirmed','declined')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.guests enable row level security;
-- Las rutas de servidor usan la service role, nunca se incluye en el navegador.
-- No crear políticas públicas para esta tabla.
