INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('admin','admin', 'admin@medellin.com','$2a$12$ZLjzxkSKwHFcLy1P74WdbOtVJN41./t2UyTjhwdu9ZmbGr6iwaYay','2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Juan Medellin',  'Fandiño Benavides', 'jcfandinob@medellin.com', '$2a$12$ZLjzxkSKwHFcLy1P74WdbOtVJN41./t2UyTjhwdu9ZmbGr6iwaYay' ,'2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Andres Medellin',  'Guerrero Leal', 'afguerrerol01@medellin.com', '$2a$12$ZLjzxkSKwHFcLy1P74WdbOtVJN41./t2UyTjhwdu9ZmbGr6iwaYay', '2023-01-01', '2023-01-01');

INSERT INTO tasks (title, description, status, user_id) VALUES ('Backend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Juan Medellin'));
INSERT INTO tasks (title, description, status, user_id) VALUES ('Frontend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Andres Medellin'));

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_CALI');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_MEDELLIN');
INSERT INTO roles (name) VALUES ('ROLE_USER_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_USER_CALI');
INSERT INTO roles (name) VALUES ('ROLE_USER_MEDELLIN');

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@medellin.com'), (SELECT id from roles where name = 'ROLE_ADMIN_MEDELLIN'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@medellin.com'), (SELECT id from roles where name = 'ROLE_USER_MEDELLIN'));

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'jcfandinob@medellin.com'), (SELECT id from roles where name = 'ROLE_USER_MEDELLIN'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'afguerrerol01@medellin.com'), (SELECT id from roles where name = 'ROLE_USER_MEDELLIN'));

INSERT INTO states (name) VALUES ('ABIERTA');
INSERT INTO states (name) VALUES ('EN PROGRESO');
INSERT INTO states (name) VALUES ('TERMINADO');
