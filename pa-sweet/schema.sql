-- Pa Sweet / multi-bakery platform — PostgreSQL schema (production backend)
-- Every business table carries bakery_id. Row-level security keeps each bakery's data isolated.

create extension if not exists pgcrypto;

create table bakeries (
  id            text primary key,                 -- 'pa-sweet'
  name          text not null,
  status        text not null default 'onboarding' check (status in ('onboarding','active','suspended')),
  currency      text not null default 'SLE',
  timezone      text not null default 'Africa/Freetown',
  address       text, phones text[], facebook_url text,
  opening_hours jsonb,                            -- {"open":"08:00","close":"21:30"}
  brand         jsonb,                            -- logo url, colours, fonts
  settings      jsonb not null default '{}',      -- delivery zones, lead days, capacity, loyalty, pricing rules
  created_at    timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email citext unique, phone text, name text,
  password_hash text,                              -- argon2id via auth provider; never plain text
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table memberships (                         -- staff roles per bakery (least privilege)
  user_id uuid references users(id) on delete cascade,
  bakery_id text references bakeries(id) on delete cascade,
  role text not null check (role in ('owner','admin','manager','baker','decorator','fulfilment','support','delivery')),
  primary key (user_id, bakery_id)
);

create table categories (id text, bakery_id text references bakeries(id), name text not null, position int default 0, primary key (bakery_id, id));

create table products (
  id text, bakery_id text references bakeries(id),
  category_id text, name text not null, description text,
  base_price numeric(12,2) not null check (base_price >= 0),
  made_to_order boolean not null default false, lead_days int not null default 0,
  available boolean not null default false, featured boolean not null default false,
  ingredients text, allergens text, storage text, nutrition text,   -- verified by bakery only
  tags text[], images text[], created_at timestamptz default now(),
  primary key (bakery_id, id)
);
create table product_variants (id uuid primary key default gen_random_uuid(), bakery_id text, product_id text, label text not null, price_delta numeric(12,2) default 0,
  foreign key (bakery_id, product_id) references products(bakery_id, id) on delete cascade);
create table product_options (id uuid primary key default gen_random_uuid(), bakery_id text, product_id text, kind text check (kind in ('flavour','frosting','filling','addon','box_item')), label text, price_delta numeric(12,2) default 0,
  foreign key (bakery_id, product_id) references products(bakery_id, id) on delete cascade);

create table orders (
  id text primary key, bakery_id text not null references bakeries(id),
  customer_id uuid references users(id), customer jsonb not null,           -- name, phone, email snapshot
  idempotency_key text not null, status text not null, production_stage text,
  fulfilment jsonb not null,                                               -- method, zone, address, date, time
  subtotal numeric(12,2), discount numeric(12,2), delivery_fee numeric(12,2), tax numeric(12,2), total numeric(12,2),
  pricing_snapshot jsonb not null,                                         -- rules applied when confirmed
  allergy_notes text, notes text, assigned_to uuid references users(id),
  created_at timestamptz default now(),
  unique (bakery_id, idempotency_key)
);
create table order_items (id uuid primary key default gen_random_uuid(), order_id text references orders(id) on delete cascade, bakery_id text not null,
  product_id text, name text, qty int check (qty > 0), unit_price numeric(12,2), options jsonb, box_items jsonb, quote_id text);
create table order_events (id bigserial primary key, order_id text references orders(id), bakery_id text not null, status text, by_user uuid, at timestamptz default now(), note text);

create table payments (id uuid primary key default gen_random_uuid(), order_id text references orders(id), bakery_id text not null,
  provider text, provider_ref text unique, method text, amount numeric(12,2), status text check (status in ('pending','paid','failed','refund_pending','refunded')),
  raw_webhook jsonb, created_at timestamptz default now());           -- status changes only from verified webhooks

create table cake_designs (id uuid primary key default gen_random_uuid(), bakery_id text not null, customer_id uuid references users(id),
  title text, spec jsonb not null, reference_image text, share_reference boolean default false, estimate_low numeric, estimate_high numeric, created_at timestamptz default now(), updated_at timestamptz default now());
create table cake_design_revisions (id bigserial primary key, design_id uuid references cake_designs(id) on delete cascade, spec jsonb, at timestamptz default now());
create table quotes (id text primary key, bakery_id text not null, design_id uuid references cake_designs(id), customer jsonb, event_date date, method text, guests int,
  status text not null check (status in ('Draft','Awaiting details','Ready for bakery review','Under review','Revision requested','Quote prepared','Approved','Declined','Expired','Converted to order')),
  estimate jsonb, quoted_price numeric(12,2), staff_notes text, order_id text references orders(id), created_at timestamptz default now());

create table ingredients (id uuid primary key default gen_random_uuid(), bakery_id text not null, name text, unit text check (unit in ('g','kg','ml','l','pcs')),
  qty numeric(14,3) not null default 0, reorder_at numeric(14,3), supplier text, cost numeric(12,2));
create table stock_movements (id bigserial primary key, bakery_id text not null, ingredient_id uuid references ingredients(id), delta numeric(14,3), kind text check (kind in ('received','used','wasted','adjusted')),
  order_id text, idempotency_key text, at timestamptz default now(), unique (bakery_id, idempotency_key));

create table promotions (code text, bakery_id text references bakeries(id), kind text check (kind in ('percent','fixed')), value numeric, min_spend numeric, starts date, ends date, max_uses int, uses int default 0, active boolean default true, primary key (bakery_id, code));
create table loyalty_transactions (id bigserial primary key, bakery_id text not null, customer_id uuid references users(id), order_id text references orders(id), points int, reason text, at timestamptz default now(), unique (order_id, reason));
create table celebrations (id uuid primary key default gen_random_uuid(), bakery_id text not null, customer_id uuid references users(id), name text, event_date date, preferences text, remind_days int, created_at timestamptz default now());
create table favourites (customer_id uuid references users(id), bakery_id text, product_id text, primary key (customer_id, bakery_id, product_id));
create table reviews (id uuid primary key default gen_random_uuid(), bakery_id text not null, product_id text, order_id text references orders(id), customer_id uuid, rating int check (rating between 1 and 5), body text, status text default 'pending', created_at timestamptz default now());
create table enquiries (id uuid primary key default gen_random_uuid(), bakery_id text not null, name text, email text, phone text, topic text, order_ref text, message text, handled boolean default false, created_at timestamptz default now());
create table subscribers (bakery_id text, email citext, consent_at timestamptz not null, primary key (bakery_id, email));
create table audit_log (id bigserial primary key, bakery_id text, user_id uuid, action text, ref text, at timestamptz default now());

-- Tenant isolation: the API sets `app.bakery_id` and `app.user_id` per request.
do $$ declare t text; begin
  foreach t in array array['categories','products','product_variants','product_options','orders','order_items','order_events','payments','cake_designs','quotes',
    'ingredients','stock_movements','promotions','loyalty_transactions','celebrations','reviews','enquiries','subscribers','audit_log'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy tenant_isolation on %I using (bakery_id = current_setting(''app.bakery_id'', true))', t);
  end loop; end $$;

insert into bakeries (id, name, status, currency, address, phones, opening_hours)
values ('pa-sweet', 'Pa Sweet', 'active', 'SLE', '70 Wilkinson Road, Freetown (opposite Basha Restaurant)', array['030 552220','088 111666'], '{"open":"08:00","close":"21:30"}');
