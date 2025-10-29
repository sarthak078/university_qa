-- Function to update vote counts on questions
create or replace function public.update_question_vote_count()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    update public.questions
    set vote_count = vote_count + new.vote_type
    where id = new.question_id;
  elsif TG_OP = 'UPDATE' then
    update public.questions
    set vote_count = vote_count + (new.vote_type - old.vote_type)
    where id = new.question_id;
  elsif TG_OP = 'DELETE' then
    update public.questions
    set vote_count = vote_count - old.vote_type
    where id = old.question_id;
  end if;
  return null;
end;
$$;

-- Function to update vote counts on comments
create or replace function public.update_comment_vote_count()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    update public.comments
    set vote_count = vote_count + new.vote_type
    where id = new.comment_id;
  elsif TG_OP = 'UPDATE' then
    update public.comments
    set vote_count = vote_count + (new.vote_type - old.vote_type)
    where id = new.comment_id;
  elsif TG_OP = 'DELETE' then
    update public.comments
    set vote_count = vote_count - old.vote_type
    where id = old.comment_id;
  end if;
  return null;
end;
$$;

-- Triggers for question votes
drop trigger if exists question_vote_insert on public.votes;
create trigger question_vote_insert
  after insert on public.votes
  for each row
  when (new.question_id is not null)
  execute function public.update_question_vote_count();

drop trigger if exists question_vote_update on public.votes;
create trigger question_vote_update
  after update on public.votes
  for each row
  when (new.question_id is not null)
  execute function public.update_question_vote_count();

drop trigger if exists question_vote_delete on public.votes;
create trigger question_vote_delete
  after delete on public.votes
  for each row
  when (old.question_id is not null)
  execute function public.update_question_vote_count();

-- Triggers for comment votes
drop trigger if exists comment_vote_insert on public.votes;
create trigger comment_vote_insert
  after insert on public.votes
  for each row
  when (new.comment_id is not null)
  execute function public.update_comment_vote_count();

drop trigger if exists comment_vote_update on public.votes;
create trigger comment_vote_update
  after update on public.votes
  for each row
  when (new.comment_id is not null)
  execute function public.update_comment_vote_count();

drop trigger if exists comment_vote_delete on public.votes;
create trigger comment_vote_delete
  after delete on public.votes
  for each row
  when (old.comment_id is not null)
  execute function public.update_comment_vote_count();
