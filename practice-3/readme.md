# Practice 3

Deploy and manage a small observability platform (Prometheus + Grafana + Node Exporter) in Kubernetes 
with advanced features like persistent storage, custom namespaces, RBAC, and Helm or Kustomize

Prometheus – scrapes metrics from Node Exporters and your cluster.
Grafana – visualizes those metrics.
Node Exporter – runs as a DaemonSet to expose host metrics.
Custom App (optional) – a simple “hello” service exposing /metrics endpoint.


This project focuses on advanced Kubernetes control, not app code.



# Phase 1 - Creating the namespace
| Command                                      | Description                                           |
| -------------------------------------------- | ----------------------------------------------------- |
| `kubectl get namespaces` or `kubectl get ns` | List all namespaces.                                  |
| `kubectl describe namespace <name>`          | Show detailed information about a specific namespace. |
| `kubectl get ns -o wide`                     | Show namespaces with extra details.                   |
| `kubectl get ns -o yaml`                     | Output namespace definitions in YAML format.          |


| Command                           | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| `kubectl create namespace <name>` | Create a new namespace.                          |
| `kubectl apply -f namespace.yaml` | Create (or update) a namespace from a YAML file. |


apiVersion: v1
kind: Namespace
metadata:
  name: dev
  labels:
    environment: development

| Command                           | Description                               |
| --------------------------------- | ----------------------------------------- |
| `kubectl delete namespace <name>` | Delete a namespace and all its resources. |
| `kubectl delete ns <name>`        | Short form of the above.                  |


| Command                                                        | Description                                                      |                                                          |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| `kubectl get pods -n <namespace>`                              | List pods in a specific namespace.                               |                                                          |
| `kubectl get all -n <namespace>`                               | Show all resources in a namespace.                               |                                                          |
| `kubectl config set-context --current --namespace=<namespace>` | Set your current context to use a specific namespace by default. |                                                          |
| `kubectl config view --minify                                  | grep namespace:`                                                 | See which namespace is currently active in your context. |

| Command                                                                       | Description                                     |
| ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `kubectl edit namespace <name>`                                               | Open the namespace in your editor to modify it. |
| `kubectl label namespace <name> <key>=<value>`                                | Add or update a label on a namespace.           |
| `kubectl annotate namespace <name> <key>=<value>`                             | Add or update an annotation on a namespace.     |
| `kubectl patch namespace <name> -p '{"metadata":{"labels":{"key":"value"}}}'` | Modify a namespace via JSON patch.              |



| Command                                    | Description                                   |
| ------------------------------------------ | --------------------------------------------- |
| `kubectl get resourcequota -n <namespace>` | View resource quotas for a namespace.         |
| `kubectl get limitrange -n <namespace>`    | View default resource limits for a namespace. |
| `kubectl get events -n <namespace>`        | See events in a specific namespace.           |


| Command                                                 | Description                                           |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `kubectl config get-contexts`                           | List all contexts (shows default namespace for each). |
| `kubectl config use-context <context>`                  | Switch between contexts (and namespaces).             |
| `kubectl config set-context <context> --namespace=<ns>` | Assign a default namespace to a context.              |



## What is a DeamonSet

A DaemonSet in Kubernetes is a controller that ensures a copy of a Pod 
runs on every (or selected) node in your cluster.

A DaemonSet makes sure that a particular type of Pod is automatically deployed to all nodes o
r only specific ones that match a rule.


































