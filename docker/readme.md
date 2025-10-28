What is a container?

Simply put, containers are isolated processes for each of your apps components. Each component run its own
isolated environment, completely isolated from everything else on your manchine.

What makes them awesome:
- Self-contained
- Isolated
- Indepented
- Portable

# Images

Container images are composed of layers. And each of these layers, once created are immutable.
Each layer in an image contains a set of filesystem changes.

# Container
A running instance of an image. Containers are isolated environments that share the same OS kernel.

# Dockerfile
A text file with instructions for building an image (like a recipe).

# CLI commands

## list images
show all your images from your system

docker images

## pull image from docker hub
downloads an image with a tag

docker pull ubuntu:latest

## Remove image rmi <name:tag>
Deletes the image <Must not be in use>

docker rmi <image>

## Build image from dockerfile
docker build -t image:1.0 . 
-t gives it a name (repos:tag)
. current dir

## Docker containers

docker run -d --name web -p 8080:80 nginx
-d detached
--name container name
-p port mapping (host:container)

## List running containers
docker ps
docker ps -a

## Stop container
docker stop web

## Start a stopped container

docker start web

## Remove a container
docker rm web

## Run command in a running container
docker exec -it web bash

## Check logs of a container
docker logs web

## view detailed info
docker inspect web

## Container stats (CPU, memory, network)
docker stats

## See top processes in a container
docker top web

## List volumes
docker volume ls

## create a volume
docker volume create mydata

## use a volume when running a container
docker run -v mydata:/data busybox

## inspect docker volume
docker volume inspect mydata

## Remove a volume
docker volume rm mydata

## list networks
docker network ls

## create network
docker network create mynet

## connect container to a network
docker network connect mynet web

## disconnect a container
docker network disconnect mynet web

## remove all stopped containers
docker container prune

## remove all unused images
docker image prune

## Remove everything not in use
docker system prune -a













