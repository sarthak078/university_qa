-- Fix foreign key relationships to point to profiles table instead of auth.users
-- This allows Supabase PostgREST to properly resolve joins

-- Fix questions table
alter table if exists public.questions 
  drop constraint if exists questions_user_id_fkey;

alter table public.questions 
  add constraint questions_user_id_fkey 
  foreign key (user_id) 
  references public.profiles(id) 
  on delete set null;

-- Fix comments table
alter table if exists public.comments 
  drop constraint if exists comments_user_id_fkey;

alter table public.comments 
  add constraint comments_user_id_fkey 
  foreign key (user_id) 
  references public.profiles(id) 
  on delete set null;
