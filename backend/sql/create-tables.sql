-- Crear tabla usuarios

create table if not exists users(
	id serial primary key,
	name varchar(255) not null,
	lastname varchar(255) not null,
	email varchar(255) not null unique,
	password varchar(255) not null,
	created_at date,
	updated_at date
);

-- Crear tabla tareas

create table if not exists tasks(
	id serial primary key,
	title varchar(255) not null,
	description varchar(255) not null,
	status varchar(255) not null,
	user_id int not null,
	foreign key (user_id) references users(id)
);


-- Crear tabla de estados

create table if not exists states(
	name varchar(255) primary key
);


-- Crear tabla de roles

create table if not exists roles(
	id serial primary key,
	name varchar(255) not null
);

-- Crear tabla de usuarios y roles

create table if not exists users_roles(
	user_id int not null,
	role_id int not null,
	foreign key(user_id) references users(id),
	foreign key(role_id) references roles(id)
);




