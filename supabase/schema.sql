create extension if not exists "uuid-ossp";

create table if not exists notes (
  id uuid default uuid_generate_v4() primary key,
  title text,
  subject text,
  file_url text,
  created_at timestamp default now()
);

create table if not exists attendance (
  id uuid default uuid_generate_v4() primary key,
  date timestamp,
  status text
);

create table if not exists discussions (
  id uuid default uuid_generate_v4() primary key,
  content text,
  created_at timestamp default now()
);
