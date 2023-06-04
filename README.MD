# Proyecto con microservicios

## Estructura del proyecto

### Bogotá

- bogota-user-service: Servicio para usuarios de Bogotá
- bogota-task-service: Servicio para tareas de un usuario de Bogotá
- bogota-state-service: Servicio para estados de tareas de Bogotá

### Medellín

- medellin-user-service: Servicio para usuarios de Medellín
- medellin-task-service: Servicio para tareas de un usuario de Medellín
- medellin-state-service: Servicio para estados de tareas de Medellín

### Cali

- cali-user-service: Servicio para usuarios de Cali
- cali-task-service: Servicio para tareas de un usuario de Cali
- cali-state-service: Servicio para estados de tareas de Cali

## Docker

## Todos los servicios en segundo plano

```
docker compose up -d
```
## Todos los servicios en primer plano

```
docker compose up
```
## Todos los servicios en primer plano separando los servicios en pestañas

```
sh script.sh
```

## Servicios individuales

### DB

- Ejecutar base de datos

#### Bogotá

```
docker compose up --build -d db-bogota
```
#### Cali

```
docker compose up --build -d db-cali
```

#### Medellín

```
docker compose up --build -d db-medellin
```

### API

```
docker compose up --build -d api
```

### Servicios Bogotá

- Ejecutar bogota-user-service

```
docker compose up --build bogota-user
```

- Ejecutar bogota-task-service

```
docker compose up --build bogota-task
```

- Ejecutar bogota-state-service

```
docker compose up --build bogota-state
```
### Servicios Cali

- Ejecutar cali-user-service

```
docker compose up --build cali-user
```

- Ejecutar cali-task-service

```
docker compose up --build cali-task
```

- Ejecutar cali-state-service

```
docker compose up --build cali-state
```

### Servicios Medellín

- Ejecutar medellin-user-service

```
docker compose up --build medellin-user
```

- Ejecutar medellin-task-service

```
docker compose up --build medellin-task
```

- Ejecutar medellin-state-service

```
docker compose up --build medellin-state
```

Si se necesita alguno de los servicios en segundo plano agrega bandera _-d_

## Postman

Endpoints registrados hasta el momento importando el siguiente archivo

- Microservices.postman_collection.json

Entornos registrados hasta el momento importando el siguiente archivo

- Microservices.postman_environment.json

## Credenciales usuarios

| Correo                | Contraseña | Roles                                    |  Permisos |
|:---------------------:|:---------: |:----------------------------------------:|:----------: |
| admin@general.com     | admin      | Todos los roles                          |  Acceso total |
| admin@bogota.com      | bogota     | ROLE_ADMIN_BOGOTA, ROLE_USER_BOGOTA      |  Administración usuarios de bogota |
| admin@medellin.com    | medellin   | ROLE_ADMIN_MEDELLIN, ROLE_USER_MEDELLIN  |  Administración usuarios de medellin |
| admin@cali.com        | cali       | ROLE_ADMIN_CALI, ROLE_USER_CALI          |  Administración de usuarios de cali |


