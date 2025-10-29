-- Create universities table
create table if not exists public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  country text not null,
  ranking integer,
  description text,
  website_url text,
  logo_url text,
  student_count integer,
  acceptance_rate decimal,
  tuition_fee decimal,
  ai_summary text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for search and filtering
create index if not exists universities_name_idx on public.universities using gin(to_tsvector('english', name));
create index if not exists universities_location_idx on public.universities(location);
create index if not exists universities_ranking_idx on public.universities(ranking);

-- Enable RLS
alter table public.universities enable row level security;

-- Public read access for universities
create policy "universities_select_all"
  on public.universities for select
  using (true);
