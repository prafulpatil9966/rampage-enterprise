create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  singleton boolean primary key default true check (singleton),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  event_date date,
  cover_image text,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_media (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  file_url text not null,
  storage_path text not null,
  media_type text not null check (media_type in ('image', 'video')),
  file_name text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists events_slug_idx on public.events(slug);
create index if not exists events_published_featured_idx on public.events(is_published, is_featured);
create index if not exists events_event_date_idx on public.events(event_date desc);
create index if not exists event_media_event_id_sort_idx on public.event_media(event_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where singleton = true
      and user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.events enable row level security;
alter table public.event_media enable row level security;

create policy "Only the administrator can read the allowlist"
  on public.admin_users for select
  to authenticated
  using (singleton = true and user_id = auth.uid());

create policy "Public visitors can read published events"
  on public.events for select
  to anon, authenticated
  using (is_published = true);

create policy "Administrator can read all events"
  on public.events for select
  to authenticated
  using (public.is_admin());

create policy "Administrator can insert events"
  on public.events for insert
  to authenticated
  with check (public.is_admin());

create policy "Administrator can update events"
  on public.events for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Administrator can delete events"
  on public.events for delete
  to authenticated
  using (public.is_admin());

create policy "Public visitors can read media for published events"
  on public.event_media for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.events
      where events.id = event_media.event_id
        and events.is_published = true
    )
  );

create policy "Administrator can read all event media"
  on public.event_media for select
  to authenticated
  using (public.is_admin());

create policy "Administrator can insert event media"
  on public.event_media for insert
  to authenticated
  with check (
    public.is_admin()
    and exists (
      select 1 from public.events where events.id = event_media.event_id
    )
  );

create policy "Administrator can update event media"
  on public.event_media for update
  to authenticated
  using (public.is_admin())
  with check (
    public.is_admin()
    and exists (
      select 1 from public.events where events.id = event_media.event_id
    )
  );

create policy "Administrator can delete event media"
  on public.event_media for delete
  to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'rampage-events',
  'rampage-events',
  false,
  104857600,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Administrator can read event storage"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'rampage-events'
    and public.is_admin()
  );

create policy "Administrator can upload event storage"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'rampage-events'
    and public.is_admin()
  );

create policy "Administrator can update event storage"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'rampage-events'
    and public.is_admin()
  )
  with check (
    bucket_id = 'rampage-events'
    and public.is_admin()
  );

create policy "Administrator can delete event storage"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'rampage-events'
    and public.is_admin()
  );

create policy "Public visitors can read media from published events"
  on storage.objects for select
  to anon
  using (
    bucket_id = 'rampage-events'
    and exists (
      select 1
      from public.events
      where events.is_published = true
        and (
          split_part(storage.objects.name, '/', 1) = events.id::text
          or split_part(storage.objects.name, '/', 2) = events.id::text
        )
    )
  );
