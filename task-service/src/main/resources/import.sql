INSERT INTO tasks (title, description, status, user_id) VALUES ('Backend', 'Descripción', 'En progreso', (SELECT id from users where name = 'Juan Camilo'));
INSERT INTO tasks (title, description, status, user_id) VALUES ('Frontend', 'Descripción', 'En progreso', (SELECT id from users where name = 'Andres Felipe'));