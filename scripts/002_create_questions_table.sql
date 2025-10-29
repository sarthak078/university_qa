-- Create questions table
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  content text not null,
  ai_answer text,
  vote_count integer default 0,
  comment_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes
create index if not exists questions_university_idx on public.questions(university_id);
create index if not exists questions_user_idx on public.questions(user_id);
create index if not exists questions_created_at_idx on public.questions(created_at desc);

-- Enable RLS
alter table public.questions enable row level security;

-- Public read access
create policy "questions_select_all"
  on public.questions for select
  using (true);

-- Authenticated users can insert
create policy "questions_insert_authenticated"
  on public.questions for insert
  with check (auth.uid() = user_id);

-- Users can update their own questions
create policy "questions_update_own"
  on public.questions for update
  using (auth.uid() = user_id);

-- Users can delete their own questions
create policy "questions_delete_own"
  on public.questions for delete
  using (auth.uid() = user_id);
