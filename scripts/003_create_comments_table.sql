-- Create comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  parent_comment_id uuid references public.comments(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  content text not null,
  vote_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes
create index if not exists comments_question_idx on public.comments(question_id);
create index if not exists comments_parent_idx on public.comments(parent_comment_id);
create index if not exists comments_user_idx on public.comments(user_id);
create index if not exists comments_created_at_idx on public.comments(created_at);

-- Enable RLS
alter table public.comments enable row level security;

-- Public read access
create policy "comments_select_all"
  on public.comments for select
  using (true);

-- Authenticated users can insert
create policy "comments_insert_authenticated"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Users can update their own comments
create policy "comments_update_own"
  on public.comments for update
  using (auth.uid() = user_id);

-- Users can delete their own comments
create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = user_id);
