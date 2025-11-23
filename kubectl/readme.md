# Kubectl

# Config and context

kubectl config view
-- raw To see settings and certificate 
exposed and secrets

kubectl config get-contexts
kubectl config current-context
kubectl config set-cluster name

kubectl config set-context --current --namespace=ggckad-s2


# Creating objects

kubectl apply -f ./my-manifest.yaml

kubectl create deployment nginx --image=nginx

kubectl create job hello --image=busybox:1.28 -- echo "Hello World"

kubectl explain pods

# View and find resources

kubectl get services
kubectl get pods --all-namespaces
kubectl get pods -o wide

kubectl get services --sort-by=.metadata.name

# Most important kubectl CLI commands

# Check cluster connection
kubectl cluster-info

# view noodes
kubectl get nodes
kubectl describe node <node>

# view cluster components (kube-system)
kubectl get pods -n kube-system

# list pods
kubectl get pods
kubectl get pods -A
kubectl get pods -n <namespace>

# describe a pod
kubectl describe pod <pod-name>

# view pod logs
kubectl logs <pod>
kubectl logs -f <pod> # Follow logs

# Exe insde a pod
kubectl exec -it <pod> 

# delete a pod
kubectl delete pod <pod>

# get deployments
kubectl get deployments

# create deployment
kubectl create deployment myapp --image=nginx

# apply a deployment yaml
kubectl apply -f deployment.yaml

# scale deployment 
kubectl scale deployment myapp --replicas=5

# update deployment image
kubectl set image deployment/myapp nginx=nginx:1.24

# rollout commands
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp

# list services
kubectl get svc

# describe service
kubectl describe svc <service>

# expose deployment as a service
kubectl expose deployment myapp --type=LoadBalancer --port=80

# list namespaces
kubectl get ns

# create namespace
kubectl create ns staging

# use default namespace
kubectl config set-context --current --namespace=staging

# Advanced

# Apply everything in a folder
kubectl apply -f k8s/

# debug ephemeral container
kubectl debug pod/myapp -it --image=busybox

# port forwarding
kubectl port-forward pod/myapp 8080:80

# show live object manifest
kubectl get deploy myapp -o yaml

# patch resources
kubectl patch deploy myapp -p '{"spec": {"replicas": 10}}'


# list contexts
kubectl config get-context

# use a context
kubectl config use-context minikube








































































































