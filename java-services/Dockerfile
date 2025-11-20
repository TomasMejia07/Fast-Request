# Etapa 1: Construcción del proyecto (Maven + JDK 21)
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Crear carpeta de trabajo
WORKDIR /app

# Copiar archivos de Maven
COPY pom.xml .
COPY src ./src

# Construir la aplicación
RUN mvn clean package -DskipTests


# Etapa 2: Imagen final (JRE 21)
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar el JAR generado desde la imagen anterior
COPY --from=builder /app/target/*.jar app.jar

# Puerto del microservicio
EXPOSE 8080

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
