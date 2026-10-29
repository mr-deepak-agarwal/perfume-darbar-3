-- Perfume Darbar: Supabase schema
-- Run in the Supabase SQL editor. Column names mirror the Product type in lib/products.ts,
-- so switching from the built-in fake data to live data is a drop-in change.

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category text not null check (category in ('Women', 'Men', 'Unisex', 'Gift Set')),
  scent text check (scent in ('Fresh Notes', 'Sweet', 'Oud', 'Woody', 'Spicy')),
  family text not null,
  conc text not null check (conc in ('EDT', 'EDP', 'Parfum', 'Attar', 'Set')),
  size text not null,
  price integer not null check (price >= 0),          -- selling price in INR (whole rupees)
  mrp integer not null check (mrp >= price),
  tag text,                                            -- Bestseller / New / Limited / Premium / Sample
  is_sample boolean not null default false,
  top text, heart text, base text,                     -- notes, comma separated
  description text,
  occasions text[] not null default '{}',
  rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  sold integer not null default 0,
  c1 text, c2 text,                                    -- bottle illustration colours
  image_url text,                                      -- optional full URL (e.g. Supabase Storage); default is /products/<slug>.jpg
  position integer not null default 0,                 -- display order
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists products_active_idx on products (is_active, category);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

create sequence if not exists order_number_seq start 100001;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('PD' || nextval('order_number_seq')::text),
  customer_id uuid references customers(id),
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  payment_method text not null check (payment_method in ('upi', 'card', 'cod')),
  shipping_address jsonb not null,
  subtotal integer not null,
  bundle_discount integer not null default 0,
  prepaid_discount integer not null default 0,
  shipping_fee integer not null default 0,
  total integer not null,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  product_name text not null,                          -- snapshot, so old orders survive catalog edits
  quantity integer not null check (quantity between 1 and 20),
  unit_price integer not null
);

-- Row Level Security.
-- The storefront (anon key) may only READ active products. Customers, orders and order_items have
-- RLS on and NO policies, so the anon key cannot touch them at all; only the backend can, using
-- the service-role key (which bypasses RLS). Add per-user policies when real auth is introduced.
alter table products enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

drop policy if exists "Public can read active products" on products;
create policy "Public can read active products" on products for select using (is_active = true);
