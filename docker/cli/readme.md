# CLI commands the most important ones

## Check docker installation
docker --version
docker info

# Download a docker image
docker pull <image>

# List images
docker images

# Run a container
docker run <image>
-d detached
-p port binding
--name give a name

# List running containers
docker ps

# Stop/start/restart a container

docker stop <container>
docker start <container>
docker restart <container>

# remove containers and images
docker rm <id/name>
docker rmi <image>

# View logs
docker logs <container>
docker logs -f <container>

# Exec into a container
docker exec -it <container> /bin/bash
or
docker exec -it <container> sh

# copy files to/from container
docker cp <container>:/path/file /host/path
docker cp /host/paht <container>:/path

# inspect container metadata
docker inspect <container>

# show ports
docker port <container>

# view resource usage
docker stats

# build an image from dockerfile
docker build -t myapp:1.0 .

# tag an image
docker tag myapp:1.0 myrepo/myapp:latest

# push an image
docker push myrepo/myapp:latest

# remove all stopped containers
docker container prune

# remove unused images
docker image prune

# remove everything
docker system prune -a

# Bind mount

docker run -v /host/path:/container/path nginx

# named volume
docker volume create myvol
docker run -v myvol:/data nginx

# List volumes
docker volume ls


# list networks
docker networks ls


# create network
docker network create mynet

# run container in network
docker run --network=net --name=db mysql

# connect container to a network
docker network connect mynet myapp















































































