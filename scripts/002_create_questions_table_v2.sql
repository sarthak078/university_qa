-- Drop existing foreign key if it exists and recreate with proper relationship
alter table if exists public.questions 
  drop constraint if exists questions_user_id_fkey;

-- Add foreign key to profiles table instead of auth.users
alter table public.questions 
  add constraint questions_user_id_fkey 
  foreign key (user_id) 
  references public.profiles(id) 
  on delete set null;
