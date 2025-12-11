# What is an Ingress in Kubernetes?

An Ingress is a Kubernetes object that manages external access to your cluster’s services, usually HTTP/HTTPS.
Instead of exposing each service with a LoadBalancer or NodePort, an Ingress lets you define routing rules for incoming traffic.

"A smart router inside Kubernetes that sends traffic to the correct service."

But note: an Ingress needs an Ingress Controller to actually work (NGINX, Traefik, HAProxy, Contour, etc.).

# What does it do?
1. Route traffic to different services based on URL path

2. Route traffic based on hostnames
Example:
api.example.com → api-service
shop.example.com → shop-service


## Handle TLS / HTTPS

Ingress can terminate SSL/TLS:
tls:
  - hosts:
      - example.com
    secretName: example-tls
The TLS secret stores your certificate and key.
The controller (NGINX, Traefik...) does the real TLS work.

##  Rewrite URLs / manipulate paths

## Load balancing
All Ingress controllers offer:
Round-robin load balancing
Sticky sessions (affinity)
Health checks
Connection timeouts

# Apply security rules
Many controllers allow:
- IP whitelisting
- Rate limiting
- Basic authenticatio
- Web Application Firewall (WAF)
- JWT validation
- OAuth2 proxy

# How it looks?
1. apiVersion, kind, metadata

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: default

apiVersion: Always networking.k8s.io/v1 on modern K8s.
kind: Ingress — tells Kubernetes what type of object this is.
metadata: 
name: the name of the ingress resource
namespace: optional (defaults to "default")

2. metadata.annotations (controller-specific)
annotations:
  nginx.ingress.kubernetes.io/rewrite-target: /
  nginx.ingress.kubernetes.io/ssl-redirect: "true"
  cert-manager.io/cluster-issuer: "letsencrypt-prod"

Ingress is a generic API, so controllers add extra features via annotations.

3. spec.ingressClassName

ingressClassName: nginx

Specifies WHICH ingress controller should handle this resource.
Typical values:
- nginx
- traefik
- haproxy
- alb (AWS load balancer controller)
- gce (Google)
- kong

4. spec.tls (HTTPS)
tls:
  - hosts:
      - myapp.example.com
    secretName: myapp-tls

What this does:
Enables HTTPS for myapp.example.com
Uses TLS cert stored in Secret myapp-tls (type: kubernetes.io/tls)

5. spec.rules (routing rules)
rules:
  - host: myapp.example.com
    http:
      paths:
        - path: /api
          pathType: Prefix
          backend:
            service:
              name: api-service
              port:
                number: 80