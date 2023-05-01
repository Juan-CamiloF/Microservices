INSERT INTO users (name, lastname, email, created_at, updated_at) VALUES ('Juan Camilo',  'Fandiño Benavides', 'jcfandinob@libertadores.edu.co', '2023-01-01', '2023-01-01');
INSERT INTO users (name, lastname, email, created_at, updated_at) VALUES ('Andres Felipe',  'Guerrero Leal', 'afguerrerol01@libertadores.edu.co', '2023-01-01', '2023-01-01');

INSERT INTO tasks (title, description, status, user_id) VALUES ('Backend', 'Descripción', 'En progreso', (SELECT id from users where name = 'Juan Camilo'));
INSERT INTO tasks (title, description, status, user_id) VALUES ('Frontend', 'Descripción', 'En progreso', (SELECT id from users where name = 'Andres Felipe'));

INSERT INTO states (name) VALUES ('ABIERTA');
INSERT INTO states (name) VALUES ('EN PROGRESO');
INSERT INTO states (name) VALUES ('PRUEBAS');
INSERT INTO states (name) VALUES ('TERMINADO');
INSERT INTO states (name) VALUES ('OTRO');
