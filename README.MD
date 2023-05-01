# Proyecto con microservicios

## Estructura del proyecto

### Bogotá

- bogota-user-service: Servicio para usuarios de Bogotá
- bogota-task-service: Servicio para tareas de un usuario de Bogotá
- bogota-state-service: Servicio para estados de tareas de Bogotá

### Medellin

- medellin-user-service: Servicio para usuarios de Medellin
- medellin-task-service: Servicio para tareas de un usuario de Medellin
- medellin-state-service: Servicio para estados de tareas de Medellin

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

#### Medellin

```
docker compose up --build -d db-medellin
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

### Servicios Medellin

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

Si se necesita los servicios en segundo plano agrega bandera _-d_

## Postman

Endpoints registrados hasta el momento importando el siguiente archivo

- Microservices.postman_collection.json
