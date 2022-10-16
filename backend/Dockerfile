From openjdk:11 

WORKDIR /backend
ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} backend.jar

ENTRYPOINT ["java", "-jar", "backend.jar"]