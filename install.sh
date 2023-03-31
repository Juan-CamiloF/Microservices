cd user-service
mvn clean
mvn install -DskipTests
clear
echo "user-service instalado"
cd ..
cd task-service
mvn clean
mvn install -DskipTests
clear
