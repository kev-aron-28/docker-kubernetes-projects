# What is a Kubernetes Secret

A Secret is a Kubernetes API object that holds small pieces of sensitive data (passwords, 
tokens, keys, TLS certs). 
Secrets let you avoid baking secrets into images or Pod specs. 
By default secrets are stored in the cluster data store (etcd) and are only base64-encoded in the object (not encrypted 
by default unless you configure encryption).


# How secrets are stored & important facts
Storage: Secret objects are stored in the API server backing store (typically etcd). 
By default that data may be stored unencrypted in etcd unless you enable encryption at rest. 
Anyone with API or etcd access can read or modify them. 

Encoding: Secret data fields are base64-encoded in the manifest; base64 ≠ encryption. Treat it as obfuscation for the wire/payload, not security. 

Size limit: Individual Secret (and ConfigMap) objects are limited by default to ~1 MiB (etcd / API-server limits). Don’t store large blobs in Secrets. 

KMS & encryption at rest: Kubernetes supports encrypting Secret data at rest using built-in providers or an external KMS plugin. 
Newer clusters should prefer KMS v2 when available (v1 deprecated for many versions). Configure KMS or envelope encryption to protect etcd contents

# How to create a secret

1. Terminal kubectl
kubectl create secret generic db-creds \
  --from-literal=username=admin \
  --from-literal=password='s3cr3t!' \
  -n my-namespace

2. From files
kubectl create secret tls my-tls --cert=tls.crt --key=tls.key

# How workloads consume Secrets

env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-creds
        key: password

# Mounted as files (volume):
volumes:
  - name: secret-vol
    secret:
      secretName: db-creds

Projected volumes and service account token projections offer fine-grained control for token lifetimes and audiences.

CSI Secrets Store / providers: mount secrets from external secret stores (HashiCorp Vault, AWS Secrets Manager, 
Azure Key Vault) via CSI driver (no API-server secret object required or with sync). (Tooling section below.)


# Common security pitfalls
Storing secrets in Git or container images (bad).
Relying on base64 as “encryption.” (It’s not.)
Giving broad RBAC: anyone who can create a Pod in a namespace can potentially read Secrets in that namespace (via creating a Pod that mounts them). Use least privilege
Logs, crash dumps, or error messages leaking secrets.
Long-lived static secrets with no rotation.

# Hardening & best practices (practical)
Enable encryption at rest for Secrets (etcd encryption). Prefer KMS v2 / cloud KMS integrations.

Enforce strict RBAC and minimize which service accounts / users can get/list/watch Secrets. Audit RBAC rules regularly.

Use external secret stores (Vault, cloud Secrets Managers) for higher assurance and rotation features; sync to Kubernetes when needed via operators or use CSI drivers.

void injecting secrets into images or building them into manifests in plain text — use controllers/operators that encrypt or pull at runtime.

Short-lived credentials and dynamic secrets (rotate often).

Audit & logging: enable API audit logs to detect get/list operations on Secret resources.

Avoid large secrets — keep each secret < 1 MiB and use separate services for large artifacts.

Use network and workload isolation (network policies, pod security) to limit access surfaces.

Secrets in CI/CD: don’t echo secrets in CI logs; use secrets management features in CI to inject at runtime.


# Tooling ecosystem (short guide)

Sealed Secrets (Bitnami) — encrypt a Secret into a SealedSecret that’s safe for Git; controller in-cluster decrypts into a real Secret. 
Good for GitOps workflows, but sealed secrets are one-way (you can’t recover the original sealed secret if you lose the private key) 
and have operational considerations.

External Secrets Operator (ESO) — synchronizes secrets from external providers (AWS Secrets Manager, Azure Key Vault, Google Secret Manager, 
HashiCorp Vault) into Kubernetes. Good when you want a single source of truth outside the cluster.

HashiCorp Vault (with Vault Agent Injector) — advanced dynamic secrets, leasing, fine-grained control. 
Often used when strict security & rotation is required. (Many orgs combine Vault + CSI or sidecar injection.)

CSI Secrets Store Driver — mount secrets directly from external stores into pods (optionally sync into Kubernetes Secrets). 
Useful to avoid writing secrets into etcd at all.

# hy the “raw YAML + base64” style isn’t common in real life

Base64 is not encryption
You’re just encoding values, so anyone opening the manifest (in Git or in an editor) can decode them instantly. It gives a false sense of security.

Git leaks
If you store that YAML in version control, you’re effectively putting plaintext secrets in Git (just base64). That’s considered a big security risk.

Rotation is painful
Updating the manifest means re-encoding the secret, committing, redeploying. That doesn’t scale if you have many secrets or need frequent rotation.

Operational burden
Every developer/operator touching secrets would need to handle base64 manually. This creates mistakes (wrong encoding, newlines, etc.).

# What people use in practice

1. kubectl create secret
Generate secrets from literals or files at deploy time, instead of hand-encoding.

kubectl create secret generic db-creds \
  --from-literal=username=admin \
  --from-literal=password='s3cr3t!'

# How would SealSecret would work?

1. Install the SealedSecrets controller
  Usually via Helm or a YAML manifest:
  kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.0/controller.yaml

This deploys the controller in your cluster (kube-system by default).
The controller generates a key pair:
Private key stays in the cluster.
Public key can be exported to use with kubeseal.

2. Create a normal Secret locally (never commit this!)
For example:

apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: my-app
type: Opaque
stringData:
  username: admin
  password: s3cr3t!

Save as db-secret.yaml but don’t commit this to Git.

3. Seal the Secret
Use the kubeseal CLI to encrypt it:

kubeseal --format=yaml < db-secret.yaml > db-sealedsecret.yaml
This outputs something like:

apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-credentials
  namespace: my-app
spec:
  encryptedData:
    username: AgB9Hfsf5Yl2w...
    password: AgC3xP9s9kJ1...

4. Commit the SealedSecret to Git
You commit db-sealedsecret.yaml to your repo, not the raw Secret.
Your Git history is safe, because those encrypted blobs are useless without the cluster’s private key.

5. Apply it in the cluster
When your GitOps/CD pipeline or kubectl apply runs:

kubectl apply -f db-sealedsecret.yaml
The SealedSecrets controller sees it, decrypts it, and creates the actual Secret
Now workloads can consume it like a normal Secret (env vars, volume mounts, etc.).

Key gotcha:
If you lose the controller’s private key (e.g., recreate cluster without backup), you can’t decrypt existing sealed secrets. Most teams back up the controller’s keys.