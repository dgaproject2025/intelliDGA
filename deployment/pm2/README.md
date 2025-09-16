This folder contains configuration files for [PM2](https://pm2.keymetrics.io/), a production process manager for Node.js applications.

PM2 can manage your backend service, ensuring it stays running and automatically restarts in case of crashes or server reboots. It also provides clustering, log management and monitoring capabilities.

Files you might include here:

- `ecosystem.config.js` – defines the processes to run (e.g. the Express server), environment variables for different environments (development, staging, production), and log directories.
- `post-deploy.sh` – a script executed after deployment to install dependencies, reload PM2, and perform migrations.

These files can be used in combination with deployment scripts in the `scripts/` directory to automate the deployment process.