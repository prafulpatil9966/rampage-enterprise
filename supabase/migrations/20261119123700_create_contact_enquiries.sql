create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  phone text not null check (phone ~ '^[0-9+() -]{7,15}$'),
  email text not null check (
    char_length(email) <= 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  service text not null check (
    service in (
      'Manned Guarding',
      'Event Security',
      'Residential Security',
      'Corporate Security',
      'Retail Security',
      'CCTV Monitoring'
    )
  ),
  message text not null check (char_length(btrim(message)) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_enquiries enable row level security;

revoke all on table public.contact_enquiries from anon, authenticated;
grant insert on table public.contact_enquiries to anon, authenticated;

create policy "Allow contact enquiry submissions"
  on public.contact_enquiries
  for insert
  to anon, authenticated
  with check (true);
