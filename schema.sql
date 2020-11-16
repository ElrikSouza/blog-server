create table user_account (
    _id uuid primary key,
    email varchar(254) unique not null,
    username varchar(45) unique not null,
    password varchar(60) not null
);

create table post (
    _id uuid primary key,
    user_id uuid not null references user_account(_id) on delete cascade,
    title varchar(65) not null,
    body varchar(3000) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);