create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 160),
  description text not null default '',
  event_date date,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.event_media (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index event_media_event_id_idx on public.event_media(event_id);
create index events_published_created_idx on public.events(published, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.event_media enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid() and is_admin = true
  );
$$;

create policy "Public can view published events"
  on public.events for select
  to anon, authenticated
  using (published = true);

create policy "Admins can manage events"
  on public.events for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can view published event media"
  on public.event_media for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.events
      where events.id = event_media.event_id
        and events.published = true
    )
  );

create policy "Admins can manage event media"
  on public.event_media for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Users can view their own admin profile"
  on public.admin_profiles for select
  to authenticated
  using (id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-media',
  'event-media',
  true,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view event media files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'event-media');

create policy "Admins can upload event media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'event-media'
    and public.is_admin()
  );

create policy "Admins can update event media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'event-media'
    and public.is_admin()
  )
  with check (
    bucket_id = 'event-media'
    and public.is_admin()
  );

create policy "Admins can delete event media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'event-media'
    and public.is_admin()
  );
