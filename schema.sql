create table user_account (
    _id uuid primary key,
    email varchar(254) unique not null,
    username varchar(45) unique not null,
    password varchar(60) not null
);