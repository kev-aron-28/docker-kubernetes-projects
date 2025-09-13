# ConfigMap

A ConfigMap in Kubernetes is an API object used to store configuration data in key-value pairs.
It allows you to separate configuration from your application code, making your pods more flexible and portable.

Think of it like a dictionary or properties file that your app can use.
- Common use cases:
- Storing environment variables.
- Command-line arguments.
- Config files (JSON, YAML, .properties, etc).

# Creating a ConfigMap

1. From literal values in console

``` bash
    kubectl create configmap my-config \
  --from-literal=APP_ENV=production \
  --from-literal=APP_DEBUG=false
```

1. From file 

``` bash
    kubectl create configmap my-config
  --from-file=app.properties
```

3. From a Directory

``` bash
    kubectl create configmap my-config \
  --from-file=./config-dir/
```

# Example manifest

apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  APP_ENV: "production"
  APP_DEBUG: "false"
  database.properties: |
    db.host=localhost
    db.port=5432
    db.user=admin


and to apply it

kubectl apply -f my-config.yaml

# Using config map in Pods

apiVersion: v1
kind: Pod
metadata:
    name: my-config
spec:
    containers:
        - name: app
          image: nginx
          env:
            - name: APP_ENV
              valueFrom:
                configMapKeyRef:
                    name: my-config # This is the name you give in metadata in the ConfigMap
                    key: APP_ENV
            - name: APP_TEST
              valueFrom:
                configMapKeyRef:
                    name: my-config
                    key: APP_TEST


# As entire enviroment
envFrom:
    - configMapRef:
        name: my-config

# As files in a volume
apiVersion: v1
kind: Pod
metadata:
  name: configmap-volume-pod
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - name: config-volume
          mountPath: /etc/config
  volumes:
    - name: config-volume
      configMap:
        name: my-config

This mounts ConfigMap keys as files inside /etc/config.

# Best practices

✅ Keep ConfigMaps small (Kubernetes limit is ~1MB per ConfigMap).
✅ Do not store secrets in ConfigMaps – use Secrets instead.
✅ Version your ConfigMaps if you need rollbacks (e.g., my-config-v1).
✅ Use immutable ConfigMaps for stability:
✅ If updating frequently, remember that Pods do not automatically restart when a ConfigMap changes.

