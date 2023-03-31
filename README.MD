# Proyecto con microservicios

## Estructura del proyecto

- user-service: Servicio para usuarios
- task-service: Servicio para tareas de un usuario

## Docker

- Ejecutar base de datos

```
docker compose up --build -d db
```

- Ejecutar user-service

```
docker compose up --build user
```

- Ejecutar task-service

```
docker compose up --build task
```

Si se necesita los servicios en segundo plano agrega bandera *-d*

## Postman

Endpoints registrados hasta el momento importando el siguiente archivo

- Microservices.postman_collection.json
