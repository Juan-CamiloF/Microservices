INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('admin', 'admin', 'admin@general.com', '$2a$12$AWG.CVsrT0UVDO5Ov7ZZmumH.S59qJtLy8F/LEBwZsREafPzNZ2L2', '2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('admin','admin', 'admin@bogota.com','$2a$12$tgNi24.tBHLqfo9m0S/c0.p5gPB.EMa09Fz8A4dBBDuyDeoc3768W','2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Juan Bogota',  'Fandiño Benavides', 'jcfandinob@bogota.com', '$2a$12$tgNi24.tBHLqfo9m0S/c0.p5gPB.EMa09Fz8A4dBBDuyDeoc3768W' ,'2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Andres Bogota',  'Guerrero Leal', 'afguerrerol01@bogota.com', '$2a$12$tgNi24.tBHLqfo9m0S/c0.p5gPB.EMa09Fz8A4dBBDuyDeoc3768W', '2023-01-01', '2023-01-01');

INSERT INTO tasks (title, description, status, user_id) VALUES ('Backend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Juan Bogota'));
INSERT INTO tasks (title, description, status, user_id) VALUES ('Frontend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Andres Bogota'));

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_CALI');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_MEDELLIN');
INSERT INTO roles (name) VALUES ('ROLE_USER_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_USER_CALI');
INSERT INTO roles (name) VALUES ('ROLE_USER_MEDELLIN');

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_ADMIN'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_ADMIN_BOGOTA'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_ADMIN_CALI'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_ADMIN_MEDELLIN'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_USER_BOGOTA'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_USER_CALI'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@general.com'), (SELECT id from roles where name = 'ROLE_USER_MEDELLIN'));

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@bogota.com'), (SELECT id from roles where name = 'ROLE_ADMIN_BOGOTA'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@bogota.com'), (SELECT id from roles where name = 'ROLE_USER_BOGOTA'));

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'jcfandinob@bogota.com'), (SELECT id from roles where name = 'ROLE_USER_BOGOTA'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'afguerrerol01@bogota.com'), (SELECT id from roles where name = 'ROLE_USER_BOGOTA'));

INSERT INTO states (name) VALUES ('ABIERTA');
INSERT INTO states (name) VALUES ('EN PROGRESO');
INSERT INTO states (name) VALUES ('PRUEBAS');
INSERT INTO states (name) VALUES ('TERMINADO');
INSERT INTO states (name) VALUES ('OTRO');
