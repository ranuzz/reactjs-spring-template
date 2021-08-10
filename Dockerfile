FROM openjdk:11

RUN apt-get update && apt-get install -y -q --no-install-recommends \
        maven \
    && rm -rf /var/lib/apt/lists/*

COPY project /usr/src/project

RUN cd /usr/src/project/api/src/main/resources && mkdir public

WORKDIR /usr/src/project

RUN mvn clean install

CMD ["java", "-jar",  "api/target/api-0.0.1-SNAPSHOT.jar"]