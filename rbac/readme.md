# RBAC ROLE BASED ACCESS CONTROL

Is a mechanism to control access to kubernets resoruces based on the roles of users or services accounts.
It allows you to define who can do waht on which resorces.

RBAC in Kubernetes revolves around four key objects:

1. Role / ClusterRole
2. RoleBinding / ClusterRoleBinding

# Subjects
These are the entities that request access. A subject can be:
- User: a human user.
- Group: a collection of users.
- ServiceAccount: an identity for a pod or application.

# Roles
Define permissions on resorces: Types
- Role: Namespaced. Can only grant permisions within a specific namespace
- ClusterRole: Cluster-wide. Can gran permissions across all namespaces

Permissions are defined using:
- Resources: e.g., pods, services, deployments.
- Verbs: e.g., get, list, watch, create, update, delete.
- ResourceNames: (optional) specific resource names.
- API Groups: e.g., "" for core resources like pods, or apps for deployments.

# Bindings
- Bindings connect subjects to roles.
- RoleBinding: Namespaced. Assigns a Role or ClusterRole to subjects within a namespace.
- ClusterRoleBinding: Cluster-wide. Assigns a ClusterRole to subjects across all namespaces.

# How it works
- A user or service account makes a request.
- Kubernetes checks RBAC policies (Roles + Bindings) for that subject.
- If there’s a Role or ClusterRole that allows the requested verb on the resource, access is granted.
- Think of RBAC as a permissions matrix: Subjects × Actions × Resources.

# Examples

## Role
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: dev
  name: pod-reader
rules:
- apiGroups: [""]           # "" = core API group
  resources: ["pods"]
  verbs: ["get", "list", "watch"]

This role allows reading pods only in the dev namespace.

## RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: dev
subjects:
- kind: User
  name: kevin
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

This binds user Kevin to the pod-reader role in the dev namespace.

## Cluster role
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]


## ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-binding
subjects:
- kind: User
  name: kevin
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io


$ Common verbs
| Verb             | Description                  |
| ---------------- | ---------------------------- |
| get              | Read a single resource       |
| list             | List resources               |
| watch            | Watch for changes            |
| create           | Create resources             |
| update           | Update resources             |
| patch            | Partially update resources   |
| delete           | Delete resources             |
| deletecollection | Delete multiple resources    |
| exec             | Execute commands in pods     |
| proxy            | Access the pod/service proxy |


# Best practices
- Least Privilege: Give only the permissions necessary for the job.
- Use Namespaces: Use Role/RoleBinding for namespace isolation.
- Avoid ClusterRoleBinding unless necessary: ClusterRoleBindings are powerful and can be risky.
- Use ServiceAccounts for automation: Pods and apps should have their own limited permissions.
- Audit and Review: Regularly review RBAC policies.

# CLI
kubectl get roles --all-namespaces
kubectl get rolebindings --all-namespaces
kubectl get clusterroles
kubectl get clusterrolebindings
