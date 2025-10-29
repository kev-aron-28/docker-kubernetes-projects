# Networking

Each container runs in an isoleted network namespace so this means:
own
- ip address
- routing table
- dns settins
- and even a virtual network int

And docker provides a built-in networking stack that lets containers communicate:
- with each other
- with the host
- with the outside internet


When you install docker, it automatically creates a few network drivers and default networks

docket network ls

# Types

## Bridge

default driver when you run docker run without specifying a network
creates an internal virtual switch on the host
containers get an internatl IP
containers can reach each other using that IP or the name if in the same bridge
and the host acts as a NAT gateway to the outside world

### Connect containers

docker network create mynet
docker run -d --name app --network mynet nginx
docker run -it --rm --network mynet alpine pign app

## Host
The container shares the hosts network stack
Theres no isolation as it uses the same IP as the host
Faster networking but less secure

docker run --network host nginx
But nginx will bind directly to host port


# All network drivers
| Driver              | Description                                             | Use Case                                           |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| **bridge**          | Default network for single-host container communication | Local dev setups                                   |
| **host**            | Shares host network stack                               | High-performance apps, network tools               |
| **none**            | No network access                                       | Security, data-only containers                     |
| **overlay**         | Multi-host networking using Swarm                       | Clustered services                                 |
| **macvlan**         | Assigns real MAC & IP on LAN                            | When containers need to appear as physical devices |
| **ipvlan**          | Like macvlan but lighter and more controlled            | High-performance container networking              |
| **network plugins** | 3rd-party networks (Calico, Weave, etc.)                | Production Kubernetes/Docker EE                    |



# Inspect networks with cli

docker network inspect bridge

# Disconnect and connect containers

docker network connect mybridge app
docker network disconnect mybridge app


# Port maping

docker run -p 8080:80 nginx
Host: 8080, Port: 80


# DNS resolution
docker automatically provides:
 - an internar dns server
 - and a hostname which is equal to the container name


# Overlay networks
Used with Docker Swarm or Docker Enterprise.

Allows containers on different physical hosts to communicate securely.
Uses VXLAN tunnels under the hood




















