# Persistent Volume Claim

A PersistentVolumeClaim (PVC) is a request for storage by a Kubernetes user. It is used by pods to get persistent storage from the cluster.

PersistentVolume (PV) – The actual storage resource (e.g., NFS share, cloud disk, local disk).
PersistentVolumeClaim (PVC) – A request for storage, specifying:
- Size
- Access mode
- Storage class (optional)

Binding – Kubernetes matches a PVC to a suitable PV automatically.

Access Modes:
- ReadWriteOnce (RWO) – Mounted as read/write by one node.
- ReadOnlyMany (ROX) – Mounted read-only by many nodes.
- ReadWriteMany (RWX) – Mounted read/write by many nodes.

# PVC Lifecycle
- Creation – User creates PVC YAML.
- Binding – Kubernetes finds a matching PV (static) or creates one dynamically (StorageClass).
- Pod Usage – Pod mounts the PVC as a volume.
- Reclaiming – When PVC is deleted, PV behavior depends on reclaimPolicy:
    - Retain → PV is kept.
    - Delete → PV is deleted.
    - Recycle → PV content is scrubbed (deprecated).

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mydb
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassname: standard

accessModes: Type of access needed by pod.
resources.requests.storage: Size of the storage requested.
storageClassName: Optional, defines the class of storage (fast SSD, slow HDD, etc.).

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mydb
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassname: standard