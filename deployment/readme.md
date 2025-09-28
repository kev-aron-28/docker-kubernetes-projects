# What is a deployment
- Deployment is a higher-level kubernetes object that manages ReplicaSets and Pods
It ensures that your app runs the desired number of replicas and handles updates, rollbacks
and scaling automatically

# Deployment vs. Other Controllers
Pod → Single instance of a container (ephemeral).
ReplicaSet → Ensures N replicas of a Pod are running.
Deployment → Manages ReplicaSets, updates, and rollbacks (preferred for stateless apps).
StatefulSet → For stateful apps (DBs, Kafka, etc.).
DaemonSet → Ensures one pod per node.

# Anatomy of a Deployment
apiVersion: apps/v1
metadata:
    name: app
spec:
    replicas: 2
    selector:
        matchLabels:
            app: app
    template:
        metadata:
            labels:
                app: app
        spec:
            containers:
            - name: app
              image: image
              ports:
                - containerPort: 80   

Key parts:
replicas → how many pods to run.
selector → how Deployment finds which pods it manages.
template → blueprint for Pods.
containers → image, ports, env vars, resources, probes.

# The metadata section
Every object in kubernetes has a metadata section, It provides identifying info
labels, annotations and other bookkeeping fields.

## Common fields
- name
Unique name for the object within its namespace
Must be DNS compatible
- namespace
Groups objects logically like folders
Defaults to default if not provided
- labels
Key value pairs for grouping and selecting and organizing
Used heavily by selectors (Deployments, Services, etc.).
metadata:
  labels:
    app: myapp
    tier: backend
    env: production
- annotations
Arbitrary key-value metadata (NOT used for selection).
Used by tools, plugins, CI/CD pipelines.
metadata:
  annotations:
    description: "Deployment for myapp backend"
    gitCommit: "abc123"
    contact: "devops@company.com"
- generateName
Lets Kubernetes auto-generate a unique name prefix.
Common in Jobs, Pods.
metadata:
  generateName: temp-job-
- 0wnerReferences
Defines parent/child relationships between objects.
Example (Pod owned by ReplicaSet):
- apiVersion: apps/v1
    kind: ReplicaSet
    name: myapp-rs
    uid: 12345abcd

# What is spec.selector?
It’s a label query.
It defines which Pods are managed by the controller (e.g., Deployment, ReplicaSet, Service).
It must match the labels in the Pod template (spec.template.metadata.labels).
Otherwise, the Deployment won’t control its own Pods!

# Two ways to define a selector
