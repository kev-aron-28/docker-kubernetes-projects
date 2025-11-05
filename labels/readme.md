# What are labels
key value pairs you attach to any kubernetes object 
used to identify, group and select object


apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:                   # <- Labels for the deployment itself
    app: my-app
    environment: production

spec:
  selector:
    matchLabels:             # <- Used to find matching Pods
      app: my-app

  template:
    metadata:
      labels:                # <- Labels applied to Pods that this Deployment creates
        app: my-app
        tier: frontend

    spec:
      containers:
        - name: web
          image: nginx:latest


# Selectors
Selectors are used inside other objects to find matching labels.


apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
  labels:                    # (1) Labels for the Deployment object itself
    app: web
    owner: kevin

spec:
  selector:                  # (2) Tells which Pods the Deployment manages
    matchLabels:
      app: web

  template:                  # (3) Template for creating Pods
    metadata:
      labels:                # (4) Labels that the *Pods* will have
        app: web
        tier: frontend
    spec:
      containers:
        - name: nginx
          image: nginx:latest

Deployment
 ├── metadata.labels → labels about the parent (Deployment)
 ├── selector.matchLabels → which children (Pods) to manage
 └── template.metadata.labels → labels for the children (Pods)
