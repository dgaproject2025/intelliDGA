This folder contains [Terraform](https://www.terraform.io/) modules and configuration files used to provision cloud infrastructure for **intelliDGAforge**.

Terraform enables reproducible and version‑controlled infrastructure. Typical resources you might define include:

- Virtual machines or managed Kubernetes clusters to run the backend and frontend workloads.
- Load balancers and network security groups for traffic routing and access control.
- Managed databases (e.g. MongoDB Atlas, AWS DocumentDB) and storage buckets.
- Secrets management services to store sensitive configuration values.

Each environment (development, staging, production) can have its own workspace or variable files. Keep sensitive variables in separate files or use Terraform Cloud/Backend providers for state management.