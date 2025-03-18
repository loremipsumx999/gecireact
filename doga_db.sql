create database doga_db default character set utf8 collate utf8_hungarian_ci;

use doga_db;

create table users(
    id int auto_increment primary key,
    username varchar(20),
    password varchar(255),
    phone_number varchar(255),
    address varchar(255)
    );

create table products(
	id int auto_increment primary key,
    name varchar(20),
    price double,
    description varchar(255)
	);