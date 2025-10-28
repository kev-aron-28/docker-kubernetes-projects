# Volumes

## What are volumes in docker?
Docker mechanism for persistent data storage meaning data that stays even when a container is stopped, removed or recreated.
By default containers, are ephemeral

# WHy use volumes?\
- Persistence
- Sharing
- Performance
- Isolation
- Backup and migration

# Types of volumes
1. Anonymous volumes
   - created automatically when you run -v /path without a name
   - Docker assigns a random name
   - docker run -d -v /data nginx

2. named volumes
  - you assign a a name; docker manages it
  - docker volume create mydata;  docker run -d -v mydata:/data nginx

3. Binds mounts
  - you specify an exact host path
  - docker links a host directory to the container
  - docker run -v $(pwd)/html:/usr/share/nginx/html nginx


# Docker run volume syntax
docker run -v [source:]target[:mode]

- source: volume name or host path
- target: path inside container
- mode: access mode rw or ro

docker run -d \
  -v mydata:/app/data:rw \
  -v /home/kevin/config:/app/config:ro \
  nginx

# manage volumes with cli
## list volumes:
 - docker volume ls
 
## inspect a volume:
- docker volume inspect mydata

## remove a volume
- docker volume rm mydata

## remove all unused volumes:
- docker volume prune


# Location on the host
/var/lib/docker/volumes/
and each volume has its own directory


# Volume drivers

Volume drivers let Docker use external storage systems like NFS, AWS EBS, Ceph, GlusterFS, Azure File Share, etc.


| Driver      | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `local`     | Default (uses host filesystem under `/var/lib/docker/volumes/`) |
| `nfs`       | Mounts remote NFS shares                                        |
| `azurefile` | Mounts Azure File shares                                        |
| `rexray`    | Supports EBS, S3, GCE, etc.                                     |
| `flocker`   | Clustered data management                                       |
| `portworx`  | Enterprise multi-cloud storage                                  |




# --mount vs -v 
the --mount flag is the recommended modern way to define storage in Docker because its
- more explicit as you always define type=,source=,target=
- easier to read and debug,
- safer

# bind mount
docker run \
  --mount type=bind,source="$(pwd)"/app,target=/usr/src/app \
  node

# named mount
docker run \
  --mount type=volume,source=mydata,target=/app/data \
  nginx

# read only
docker run \
  --mount type=bind,source="$(pwd)"/config,target=/app/config,readonly \
  nginx


 

















