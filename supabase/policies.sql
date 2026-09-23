-- Already applied in Supabase on 2026-09-23. Kept for documentation. Safe to re-run.

begin;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;
insert into public.admins (user_id)
values ('YOUR-USER-UID')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

drop policy if exists "Allow public update" on public.profile;
drop policy if exists "Allow public delete" on public.profile;
drop policy if exists "Allow public insert" on public.profile;
drop policy if exists "Allow update project media" on public.project_media;
drop policy if exists "Allow delete project media" on public.project_media;
drop policy if exists "Allow insert project media" on public.project_media;
drop policy if exists "Allow insert project skills" on public.project_skills;
drop policy if exists "Allow delete project skills" on public.project_skills;
drop policy if exists "Allow update project skills" on public.project_skills;
drop policy if exists "Allow insert project" on public.projects;
drop policy if exists "Allow delete project" on public.projects;
drop policy if exists "Allow update projects" on public.projects;
drop policy if exists "Allow updateresume" on public.resumes;
drop policy if exists "Allow insert resume" on public.resumes;
drop policy if exists "Allow delete resume" on public.resumes;
drop policy if exists "Allow public delete" on public.skills;
drop policy if exists "Allow public update" on public.skills;
drop policy if exists "Allow public insert" on public.skills;

do $$
declare t text;
begin
  foreach t in array array['profile','project_media','project_skills','projects','resumes','skills'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "Admins can write" on public.%I', t);
    execute format(
      'create policy "Admins can write" on public.%I for all to authenticated
       using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "Enable insert for authenticated user" on storage.objects;
drop policy if exists "Enable delete for profile-images" on storage.objects;
drop policy if exists "Enable update for profile-images" on storage.objects;
drop policy if exists "Enable select for profile-images" on storage.objects;
drop policy if exists "Enable insert for profile-images" on storage.objects;
drop policy if exists "Enable delete for project media" on storage.objects;
drop policy if exists "Enable insert for authenticated users only" on storage.objects;
drop policy if exists "Enable update for authenticated users only" on storage.objects;
drop policy if exists "Enable delete for authenticated users only" on storage.objects;
drop policy if exists "Enable select for authenticated users only" on storage.objects;
drop policy if exists "Enable delete for project-media" on storage.objects;
drop policy if exists "Enable select for project-media" on storage.objects;

drop policy if exists "Admins manage portfolio files" on storage.objects;
create policy "Admins manage portfolio files" on storage.objects
for all to authenticated
using (bucket_id in ('project-media','profile-images','resumes') and public.is_admin())
with check (bucket_id in ('project-media','profile-images','resumes') and public.is_admin());

commit;
