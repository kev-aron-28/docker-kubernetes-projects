What is a container?

Simply put, containers are isolated processes for each of your apps components. Each component run its own
isolated enviroment, completely isolated from everything else on your manchine.

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

docker pull <image>
docker images
doker rmi <images> // remove image


docker run <image>
docker run -it <image> bash
docker ps
docker ps -a
docker stop <container>
docker start <container>
docker restart <container>
docker rm <container>
docker exec -it <container> bash
docker logs <container>


docker volume create mydata
docker volume ls
docker run -v mydata:/app/data <image>
docker run -v $(pwd):/app <image>

docker network ls
docker network create mynet
docker run --network=mynet <image>
docker inspect <container>



























