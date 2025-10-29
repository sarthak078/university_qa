-- Create votes table for questions and comments
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  vote_type integer not null check (vote_type in (-1, 1)),
  created_at timestamp with time zone default now(),
  constraint vote_target_check check (
    (question_id is not null and comment_id is null) or
    (question_id is null and comment_id is not null)
  ),
  unique(user_id, question_id),
  unique(user_id, comment_id)
);

-- Create indexes
create index if not exists votes_user_idx on public.votes(user_id);
create index if not exists votes_question_idx on public.votes(question_id);
create index if not exists votes_comment_idx on public.votes(comment_id);

-- Enable RLS
alter table public.votes enable row level security;

-- Users can view all votes
create policy "votes_select_all"
  on public.votes for select
  using (true);

-- Users can insert their own votes
create policy "votes_insert_own"
  on public.votes for insert
  with check (auth.uid() = user_id);

-- Users can update their own votes
create policy "votes_update_own"
  on public.votes for update
  using (auth.uid() = user_id);

-- Users can delete their own votes
create policy "votes_delete_own"
  on public.votes for delete
  using (auth.uid() = user_id);
