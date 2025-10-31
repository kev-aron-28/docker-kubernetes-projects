# Service
A Service in Kubernetes is an abstraction that defines a stable network 
endpoint (a name + IP) to access a set of Pods

Because Pods are ephemeral (they can be recreated, rescheduled, or killed), their IPs change
A Service provides a permanent way to reach those Pods, automatically handling load balancing between them

# Why they exists

Imagine you have 3 replicas of your web app
Each has its own internal IP
and without a service youd need to manually keep track of which pod is alive
So a services solves that: 
- Discovering all pods with specific lables,
- Giving hem a stable DNS name
- optionally exposing them outside the cluster

# Basic structure
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: webapp
  ports:
    - protocol: TCP
      port: 80         # Port exposed by the Service
      targetPort: 8080 # Port on the Pods
  type: ClusterIP

# Types of services
| Type             | Description                                                           | Accessible From              | Example Use Case                                |
| ---------------- | --------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| **ClusterIP**    | Default. Internal-only virtual IP.                                    | Inside the cluster           | Communication between backend and database Pods |
| **NodePort**     | Exposes the Service on each Node’s IP at a static port (30000–32767). | External clients             | Quick debugging, small test clusters            |
| **LoadBalancer** | Creates an external load balancer (via cloud provider).               | Internet                     | Publicly accessible web apps                    |
| **ExternalName** | Maps to an external DNS name (no selector or Pods).                   | External service integration | Connect to external APIs or DBs                 |

# Service discovery
Each service gets:
- A dns entry
- an environment variable inside pods

