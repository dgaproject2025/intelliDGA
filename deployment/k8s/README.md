This folder contains the Kubernetes manifests necessary to deploy the **intelliDGAforge** application on a Kubernetes cluster.

Typical files you might place here include:

- `deployment.yml` – a **Deployment** manifest that defines the desired state of the backend and frontend Pods, including container images, replicas, environment variables and resource limits.
- `service.yml` – a **Service** manifest to expose your Pods internally within the cluster or externally through a LoadBalancer or NodePort.
- `ingress.yml` – an **Ingress** resource for routing external HTTP/HTTPS traffic to the appropriate services, along with optional TLS termination.
- `configmap.yml` / `secret.yml` – for injecting configuration values and sensitive data (API keys, database URIs) into your Pods.

Adjust these manifests to suit your infrastructure provider (e.g. GKE, EKS, AKS) and your cluster’s environment.