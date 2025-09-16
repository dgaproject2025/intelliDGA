This directory contains deployment-related resources and configuration files for the **intelliDGAforge** application.

It acts as an umbrella for various deployment targets and tools, keeping them organised and separate from the main application code. Each subdirectory below documents a particular deployment strategy or service.

- **k8s/** – Kubernetes manifests such as `Deployment`, `Service`, `Ingress`, and `ConfigMap` definitions used to run the application in a Kubernetes cluster.
- **nginx/** – NGINX configuration files that can be used to reverse proxy the frontend and backend services, handle SSL termination, and apply load‑balancing rules.
- **pm2/** – Configuration files for [PM2](https://pm2.keymetrics.io/), a Node.js process manager, including ecosystem files for running and monitoring the backend processes.
- **terraform/** – Infrastructure‑as‑code scripts using [Terraform](https://www.terraform.io/) to provision cloud resources (e.g. databases, container registries, compute instances) for the app.

Each subdirectory contains its own `README.md` with more details.