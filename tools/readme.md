# ¿Qué es un cluster en Kubernetes?
Un cluster es el conjunto de máquinas (físicas o virtuales) que trabajan juntas para correr tus aplicaciones.
Es la unidad básica donde Kubernetes opera.

## Componentes principales de un cluster

1. Control Plane (cerebro del cluster)
Son los procesos que piensan y deciden:
API Server → punto de entrada, recibe tus kubectl apply.
Scheduler → decide en qué nodo poner cada Pod.
Controller Manager → vigila que lo que declaraste en los YAML se cumpla.
etcd → base de datos distribuida que guarda TODO el estado del cluster.

2. Nodes (los músculos del cluster)
Son las máquinas que ejecutan los contenedores.
Cada nodo tiene:
Kubelet → agente que habla con el Control Plane y ejecuta Pods.
Kube-proxy → maneja la red y balanceo entre Pods.
Runtime de contenedores (Docker, containerd, CRI-O) → corre los contenedores en sí.

3. Pods
Dentro de cada nodo se corren los Pods (tus aplicaciones).
Cluster = conjunto de nodos.
Nodo = máquina que puede correr Pods.
Pod = el contenedor real (nginx, app, base de datos, etc.).


# Kubectl (la CLI oficial)

Se conecta a tu cluster usando un archivo de configuración (kubeconfig).
Sirve para aplicar manifests, ver el estado de los recursos, hacer debugging.

# Clusters locales (para práctica / desarrollo)

## Minikube
Crea un cluster Kubernetes en tu laptop (en VM o Docker).
Perfecto para aprender.
Trae addons (Ingress, Dashboard, etc.).

## Kind (Kubernetes IN Docker)
Cluster dentro de contenedores Docker.
Muy liviano y rápido.
Ideal para CI/CD o cuando solo quieres practicar YAML.

## K3s / MicroK8s
Distribuciones ligeras de Kubernetes.
Muy usadas en IoT, edge computing o para tener un mini cluster real.

