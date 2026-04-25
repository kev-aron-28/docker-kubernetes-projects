# Review 
At is core Kubernetes is a control plane that constantly reconciles desired state vs actual state
This is based on the control loop pattern:
- You define state
- Controllers watch
- They act until reality matches the spce

# Cluster architecture

## Control plane
- API server: Entry point(kubectl, rest, CI/CD)
- etcd: Distributed key-value store, stores the entire cluster state
- controller manager
- Scheduler: decides where pods run

## Worker nodes 
- kubelet: talks to API server
- container runtime: containerd
- kube proxy: networking rules

# Core objects

- Pod: smallest deployable unit, they are ephemeral. Shared network and storage. One or more containers
- Deployment: manages replica sets, handles scaling, rolling updates, rollbacks
- Service: gives stable IP, DNS name, load balancing
- Configmap and secret
    - non-sentitive info
    - base64 encoded sensitive data

# Networking
Every pod can talk to every other pod directly, using IP
A CNI (Container network interface) plugin, they asing. Pods are ephemeral, they die and get recreated so their IP changes constantly

the solution is to use a Service
- stable ip
- dns name
- load balancing

# Types of services
1. ClusterIP
- Internal only
- Used for service-to-service communcation

2. NodePort
- Exposes services on each node

3. LoadBalancer
4. Headless service

# External traffic
To expose apps outside the cluster: you use ingress