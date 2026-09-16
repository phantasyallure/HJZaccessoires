-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

-- 1. PRODUCTS -----------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null,
  category text not null default 'other', -- necklaces | bracelets | earrings | rings | watches | other
  has_size boolean not null default false,
  sizes text[] not null default '{}',       -- e.g. {S,M,L} or {38,39,40}, typed manually by admin
  images text[] not null default '{}',      -- up to 5 public storage URLs
  stock integer not null default 0,         -- pieces available; admin-only. 0/negative = sold out to the client
  created_at timestamptz not null default now()
);

-- Migration for existing databases created before the stock column existed.
alter table products add column if not exists stock integer not null default 0;

-- Migration for existing databases created before categories existed.
alter table products add column if not exists category text not null default 'other';

alter table products enable row level security;

-- Anyone can view products (public storefront).
create policy "Public can read products"
  on products for select
  using (true);

-- Anyone can insert/update/delete for now, since the admin panel uses a
-- simple PIN screen rather than Supabase Auth. See README "Security note".
create policy "Public can manage products"
  on products for all
  using (true) with check (true);

-- 1b. PUBLIC PRODUCTS VIEW -------------------------------------------------
-- The storefront (Landing, ProductDetail) reads from this view instead of
-- the products table directly, so the real "stock" number never leaves the
-- database — the client only ever receives a sold_out boolean. The admin
-- panel keeps using the products table directly, where it can see/edit the
-- real quantity.
create or replace view products_public as
  select
    id, name, price, category, has_size, sizes, images, created_at,
    (stock <= 0) as sold_out
  from products;

grant select on products_public to anon, authenticated;

-- 2. ORDERS ---------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  wilaya text not null,
  size text,
  status text not null default 'new', -- new | contacted | confirmed | cancelled
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Public can create orders"
  on orders for insert
  with check (true);

create policy "Public can read and update orders"
  on orders for select
  using (true);

create policy "Public can update orders"
  on orders for update
  using (true) with check (true);

-- 3. SUPPORT CHAT ---------------------------------------------------------
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,      -- random id generated in the visitor's browser
  sender text not null check (sender in ('client', 'admin')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table chat_messages enable row level security;

create policy "Public can read chat"
  on chat_messages for select
  using (true);

create policy "Public can send chat"
  on chat_messages for insert
  with check (true);

-- 4. STORAGE BUCKET FOR PRODUCT PHOTOS ------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Public can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "Public can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images');
