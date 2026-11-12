-- 마실수다 프로토타입 DB 스키마
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하세요. (여러 번 실행해도 안전)

create table if not exists public.masils (
  id            bigint generated always as identity primary key,
  category      text not null,
  date_badge    text not null,
  full_date     text not null,
  max_spots     int  not null,
  current_spots int  not null default 1,
  photo         text,
  title         text not null,
  location      text not null,
  map_hint      text,
  cost          text,
  target_desc   text,
  host_name     text not null,
  host_photo    text,
  description   text,
  participants  jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id         bigint generated always as identity primary key,
  room_id    text not null,
  sender     text not null,
  photo      text,
  text       text not null,
  is_me      boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_room_idx on public.chat_messages (room_id, id);

alter table public.masils        enable row level security;
alter table public.chat_messages enable row level security;

-- ⚠️ 프로토타입용 정책: 로그인 없이 누구나 읽고 쓸 수 있습니다.
--    실제 이용자를 받기 전에 Supabase Auth(로그인)를 붙이고 정책을 좁혀야 합니다.
drop policy if exists "proto_select_masils" on public.masils;
drop policy if exists "proto_insert_masils" on public.masils;
drop policy if exists "proto_update_masils" on public.masils;
drop policy if exists "proto_select_msgs"   on public.chat_messages;
drop policy if exists "proto_insert_msgs"   on public.chat_messages;

create policy "proto_select_masils" on public.masils        for select to anon using (true);
create policy "proto_insert_masils" on public.masils        for insert to anon with check (true);
create policy "proto_update_masils" on public.masils        for update to anon using (true) with check (true);
create policy "proto_select_msgs"   on public.chat_messages for select to anon using (true);
create policy "proto_insert_msgs"   on public.chat_messages for insert to anon with check (true);
