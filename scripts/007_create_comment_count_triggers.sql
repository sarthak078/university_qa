-- Function to update comment counts on questions
create or replace function public.update_question_comment_count()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    update public.questions
    set comment_count = comment_count + 1
    where id = new.question_id;
  elsif TG_OP = 'DELETE' then
    update public.questions
    set comment_count = comment_count - 1
    where id = old.question_id;
  end if;
  return null;
end;
$$;

-- Triggers for comment counts
drop trigger if exists question_comment_insert on public.comments;
create trigger question_comment_insert
  after insert on public.comments
  for each row
  execute function public.update_question_comment_count();

drop trigger if exists question_comment_delete on public.comments;
create trigger question_comment_delete
  after delete on public.comments
  for each row
  execute function public.update_question_comment_count();
