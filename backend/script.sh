#!bin/bash
echo "Ejecutando script"
echo "Crear bases de datos"
sudo docker compose up --build -d db-bogota
echo "Base de datos de Bogotá en funcionamiento"
sudo docker compose up --build -d db-medellin
echo "Base de datos de Medellín en funcionamiento"
gnome-terminal --tab --title="Api-Gateway" -- sh -c "sudo docker compose up --build api"
echo "Apigateway"
gnome-terminal --tab --title="Bogota-User" -- sh -c "sudo docker compose up --build bogota-user"
echo "Servicio de usuarios Bogota"
gnome-terminal --tab --title="Bogota-Task" -- sh -c "sudo -s docker compose up --build bogota-task"
echo "Servicio de tareas Bogota"
gnome-terminal --tab --title="Bogota-State" -- sh -c "sudo -s docker compose up --build bogota-state"
echo "Servicio de estados Bogota"
gnome-terminal --tab --title="Medellin-User" -- sh -c "sudo -s docker compose up --build medellin-user"
echo "Servicio de usuarios Medellin"
gnome-terminal --tab --title="Medellin-Task" -- sh -c "sudo -s docker compose up --build medellin-task"
echo "Servicio de tareas Medellin"
gnome-terminal --tab --title="Medellin-State" -- sh -c "sudo -s docker compose up --build medellin-state"
echo "Servicio de estados Medelllin"
echo "\n\n Todos los servicios fueron levantados \n\n"