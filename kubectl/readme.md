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



