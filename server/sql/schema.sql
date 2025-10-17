-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id),
  email text,
  role text default 'patient',
  full_name text,
  approved boolean default false,
  city text,
  created_at timestamptz default now()
);

-- Practitioner requests (public table for applicants)
create table if not exists public.practitioner_requests (
  id serial primary key,
  name text,
  email text,
  postal text,
  phone text,
  specialty text,
  practice_type text,
  created_at timestamptz default now(),
  processed boolean default false
);

-- Admins table
create table if not exists public.admins (
  id serial primary key,
  email text unique,
  created_at timestamptz default now()
);

-- Recommended RLS policies
-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Allow authenticated users to select their own profile
create policy "Select own profile" on public.profiles
  for select using (auth.role() = 'authenticated' and id = auth.uid());

-- Allow authenticated users to update their own profile
create policy "Update own profile" on public.profiles
  for update using (auth.role() = 'authenticated' and id = auth.uid());

-- Allow admins to select/modify any profile (example: using admins table check in function)
-- You can create a SQL function is_admin() that checks admins table by email

-- Sample is_admin function
create or replace function public.is_admin() returns boolean language sql stable as $$
  select exists(select 1 from public.admins where email = auth.current_user_email());
$$;

create policy "Admins can manage profiles" on public.profiles
  for all using (public.is_admin());

-- Note: Adjust policies as needed. Be careful: function auth.current_user_email() may require configuration. Alternatively, check via auth.uid() against admins table that stores user ids.
