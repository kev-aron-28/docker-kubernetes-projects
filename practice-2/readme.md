# Estructura general

Todo archivo tiene esta estructura general

apiVersion: apps/v1   # La versión de la API
kind: Deployment      # El tipo de recurso (Pod, Service, Deployment, etc.)
metadata:             # Información como el nombre, etiquetas, namespace
  name: mi-app
spec:                 # Aquí declaras el "cómo" quieres que funcione
  ...


# Recursos basicos

Pod: Unidad mas pequeña, corre uno o mas contenedores
Deployment: Controla un conjunto de Pods (Replicas, actualizaciones, rollback)
Service: Extension y acceso a pods (ClusterIP, NodePort, LoadBalancer)
ConfigMap: Configuracion no sensible
Secret: Configuracion sensible
PersistentVolume / PErsistentVolumeClaim: Almacenamiento persistente
Ingress: Manejo de trafico HTTP hacia servicios internos


# Reglas universales de cualquier manifiesto YAML

Todos los objetos comparten la misma estructura base:

apiVersion: <versión de la API>
kind: <tipo de objeto>
metadata:
  name: <nombre único>
  labels: <pares clave-valor para identificar>
  annotations: <información extra>
spec:
  ... # Aquí depende del objeto

# Principales objetos y sus spec

# Pod

spec:
  containers:                # Lista de contenedores
    - name: nombre
      image: imagen:tag
      ports:                 # (opcional)
        - containerPort: 80
      env:                   # (opcional) variables de entorno
        - name: VAR
          value: "valor"
      volumeMounts:          # (opcional) dónde montar volúmenes
        - name: mi-vol
          mountPath: /data
  volumes:                   # (opcional) definir volúmenes
    - name: mi-vol
      emptyDir: {}

# Deployment

spec:
  replicas: 3                      # Cuántos Pods
  selector:                        # Cómo identificar esos Pods
    matchLabels:
      app: nginx
  template:                        # Plantilla de los Pods
    metadata:
      labels:
        app: nginx
    spec:                          # (igual que un Pod)
      containers:
        - name: nginx
          image: nginx:latest

# Service

spec:
  selector:                # Qué Pods apunta (por labels)
    app: nginx
  ports:
    - port: 80             # Puerto del Service
      targetPort: 80       # Puerto del contenedor
      nodePort: 30080      # (solo si es tipo NodePort)
  type: ClusterIP | NodePort | LoadBalancer


# ConfigMap

spec:   # ❌ (no tiene spec, solo data)
data:
  VAR1: "valor1"
  VAR2: "valor2"


# Secret

type: Opaque
data:
  username: YWRtaW4=   # base64(admin)
  password: c2VjcmV0   # base64(secret)

# PersistentVolumeClaim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi


Cómo sé qué propiedades existen
Kubernetes tiene esquemas oficiales que definen cada kind.

kubectl explain <Resource> --recursive
kubectl explain pod.spec.containers