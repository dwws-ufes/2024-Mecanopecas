# Imagem base com Maven e JDK 17
FROM maven:3.9.3-eclipse-temurin-17 AS build

# Diretório de trabalho no container
WORKDIR /app

# Copiando o arquivo pom.xml e as dependências do projeto
COPY pom.xml ./
COPY src ./src

# Construindo o JAR
RUN mvn clean package -DskipTests

# Usando uma imagem base menor com apenas o JDK para rodar o aplicativo
FROM openjdk:17-jdk-slim

# Diretório de trabalho no container
WORKDIR /app

# Copiando o JAR gerado na etapa anterior para o diretório de trabalho
COPY --from=build /app/target/*.jar app.jar

# Expondo a porta 8080
EXPOSE 8080

# Comando padrão para rodar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
