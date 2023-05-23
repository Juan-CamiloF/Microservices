INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('admin','admin', 'admin@cali.com','$2a$12$l3Z0ybXJSkSR08QOdQnjOukyETIm1vh1V2sEeEM8jSEPaWd8mo60e','2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Juan Cali',  'Fandiño Benavides', 'jcfandinob@cali.com', '$2a$12$l3Z0ybXJSkSR08QOdQnjOukyETIm1vh1V2sEeEM8jSEPaWd8mo60e' ,'2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES ('Andres Cali',  'Guerrero Leal', 'afguerrerol01@cali.com', '$2a$12$l3Z0ybXJSkSR08QOdQnjOukyETIm1vh1V2sEeEM8jSEPaWd8mo60e', '2023-01-01', '2023-01-01');

INSERT INTO tasks (title, description, status, user_id) VALUES ('Backend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Juan Cali'));
INSERT INTO tasks (title, description, status, user_id) VALUES ('Frontend', 'Descripción', 'EN PROGRESO', (SELECT id from users where name = 'Andres Cali'));

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_CALI');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN_MEDELLIN');
INSERT INTO roles (name) VALUES ('ROLE_USER_BOGOTA');
INSERT INTO roles (name) VALUES ('ROLE_USER_CALI');
INSERT INTO roles (name) VALUES ('ROLE_USER_MEDELLIN');

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@cali.com'), (SELECT id from roles where name = 'ROLE_ADMIN_CALI'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'admin@cali.com'), (SELECT id from roles where name = 'ROLE_USER_CALI'));

INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'jcfandinob@cali.com'), (SELECT id from roles where name = 'ROLE_USER_CALI'));
INSERT INTO users_roles (user_id, role_id) VALUES((SELECT id from users where email = 'afguerrerol01@cali.com'), (SELECT id from roles where name = 'ROLE_USER_CALI'));

INSERT INTO states (name) VALUES ('ABIERTA');
INSERT INTO states (name) VALUES ('EN PROGRESO');
INSERT INTO states (name) VALUES ('PRUEBAS');
INSERT INTO states (name) VALUES ('TERMINADO');
