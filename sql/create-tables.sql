-- Crear tabla usuarios

create table if not exists users(
	id serial primary key,
	name varchar(255) not null,
	lastname varchar(255) not null,
	email varchar(255) not null unique,
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



