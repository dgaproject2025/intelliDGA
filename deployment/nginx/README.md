The **nginx** folder contains sample configuration files for using [NGINX](https://nginx.org/) as a reverse proxy in front of the **intelliDGAforge** application.

Common use cases include:

- Terminating HTTPS connections and forwarding requests to the backend API (`backend/`) and the frontend static build (`frontend/`).
- Serving the built React application files directly from NGINX, with `try_files` rules to support client‑side routing.
- Load balancing multiple backend instances for high availability.
- Implementing caching, compression, and security headers.

Example files you might include here:

- `default.conf` – the main server block configuration for development.
- `prod.conf` – a production‑ready configuration with SSL, HTTP/2 and caching.
- `Dockerfile` – a Dockerfile based on the NGINX image that copies your configuration and static assets.