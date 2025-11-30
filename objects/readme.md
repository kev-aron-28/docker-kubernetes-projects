# All type of objects

1. Worklaod objects

1. Pod
Smallest deployable unit in Kubernetes.
Runs one or more containers.
Usually managed by higher-level controllers.

2. Deployment
Most common way to run stateless apps.
Provides:
Rolling updates
Rollbacks
Replica management
Self-healing (restarts crashed pods)

3. ReplicaSet
Ensures a fixed number of pod replicas.
Used inside a Deployment (do not create manually normally).

4. StatefulSet
Runs stateful apps that need:

Stable identity (pod-0, pod-1)
Persistent storage
Ordered startup/shutdown
Databases, Kafka, etc.

5. DaemonSet
Runs one pod on every node.
Used for:
Logging agents (Fluentd)
Monitoring (Prometheus Node Exporter)
Networking components

6. Job
Runs a one-time task until completion.
Example: run a migration script.

7. CronJob
Runs scheduled tasks.
Like Linux cron, but inside Kubernetes.


2. Networking objects

# Service
Provides network access to a set of pods
Types:
- ClusterIP (default) → internal cluster access
- NodePort → exposes on each node
- LoadBalancer → cloud load balancer
- ExternalName → DNS alias

# Ingress
Routes external HTTP/HTTPS traffic to Services.
Requires an Ingress Controller (Nginx, Traefik, etc.)
Used to expose multiple apps under one IP.

# NetworkPolicy
Controls which pods can talk to which pods.
Kubernetes firewall.

# Endpoint / EndpointSlice
Internal objects used by Services to track pod IPs.
You rarely interact with them directly.


3. Configuration and secrets
# ConfigMap
Stores non-sensitive configuration:
- Env variables
- Config files
- Command arguments

# Secret
Stores sensitive data:
Passwords
API keys
TLS certificates
Base64-encoded (not encrypted by default).

4. Storage 
# PersistentVolume (PV)
Represents real storage in the cluster:
EBS, GCE, NFS, local disk
Created by admin or dynamically.

# PersistentVolumeClaim (PVC)
Request storage.
A pod mounts a PVC → gets the PV.

# StorageClass
Describes types of storage.
Enables dynamic provisioning of PVs.

# VolumeSnapshot
A snapshot of a PV.
Useful for backups and cloning volumes.

5. RBAC (Permissions and identity)

# ServiceAccount
Identity for pods.
Used to give apps limited API permissions.

# Role
Permissions within one namespace.

# RoleBinding
Binds a Role to a user/group/ServiceAccount.

# ClusterRole
Permissions cluster-wide.

# ClusterRoleBinding
Binds a ClusterRole across entire cluster.

6. Scheduling
# Node
Represents a worker machine.
Scheduler decides which pod goes where.

# Namespace
Logical grouping of resources.

Ued for environments (dev / prod) or teams.

# Taints / Tolerations
Prevent pods from running on certain nodes unless tolerated.
Used for special nodes (GPU, memory-intensive nodes).

# Affinity / AntiAffinity
Controls pod placement:
Place same-type pods together
Avoid placing them together (for HA)

# PriorityClass
Defines importance of pods.
Higher priority → Scheduler evicts lower ones in resource pressure.

7. Autoscaling
# HorizontalPodAutoscaler (HPA)
Automatically changes Deployment or StatefulSet replica count.
Based on:
CPU
Memory
Custom metrics

# VerticalPodAutoscaler (VPA)
Adjusts pod resource requests.
Rarely used alongside HPA.

# ClusterAutoscaler
Adds/removes worker nodes in cloud environments.

8. Security / Reliability
# PodDisruptionBudget (PDB)
Ensures a minimum number of pods stay available during maintenance.
Example: "At least 1 pod must remain."

# PodSecurityPolicy (deprecated)
Used to restrict pod capabilities.
Replaced by Pod Security Admission.

9. Extensions / API Additions
# CustomResourceDefinition (CRD)\
Lets you add NEW Kubernetes types.
Example
Certificate (from cert-manager)
Application (from Argo)
VirtualService (from Istio)

# APIService
Extends the Kubernetes API server.

# Event
Shows lifecycle events and errors.
# Lease
Used for leader election.

