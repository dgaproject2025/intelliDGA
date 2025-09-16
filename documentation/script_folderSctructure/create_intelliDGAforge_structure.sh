#!/bin/bash
#
# create_intelliDGAforge_structure.sh
# This script creates the complete folder structure for the intelliDGAforge project.
# Run this script from the directory where you want the intelliDGAforge directory to be created.

set -e

# Create project root
mkdir -p intelliDGAforge
cd intelliDGAforge

# Create root files
mkdir -p .
touch README.md .editorconfig .env.example .gitignore .eslintignore .prettierrc

# Create assets directory and subfolders
mkdir -p assets/fonts assets/icons assets/images
touch assets/README.md

# Create backend directory and environment files
mkdir -p backend/src/{config,controllers,middleware,models,routes,services,validators,utils,seeds,jobs,uploads,logs,tests}
touch backend/README.md

# Backend environment example
touch backend/.env.example

# Create README.md for each backend src subdirectory
for d in config controllers middleware models routes services validators utils seeds jobs uploads logs tests; do
    touch "backend/src/$d/README.md"
done

# Create config directory with environment examples
mkdir config

# Config README
touch config/README.md

# Environment templates
touch config/development.env.example config/production.env.example config/staging.env.example config/testing.env.example

# Create database directory with migrations and seeds
mkdir -p database/migrations database/seeds
touch database/README.md
touch database/migrations/README.md database/seeds/README.md

# Create docs directory and subfolders
mkdir -p docs/api docs/architecture docs/uml
touch docs/README.md docs/uml/README.md

# Create docker directory
mkdir docker

# Create frontend directory and key files
mkdir frontend

touch frontend/README.md frontend/index.html frontend/package.json frontend/vite.config.js

# Create frontend src directory and subfolders
mkdir -p frontend/src/{assets,components,context,hooks,layouts,pages,redux,router,services,styles,tests,utils}

# Create React entry and index files
touch frontend/src/App.jsx frontend/src/main.jsx frontend/src/index.css

# Create README.md for each frontend src subfolder
for d in assets components context hooks layouts pages redux router services styles tests utils; do
    touch "frontend/src/$d/README.md"
done

# Create logs directory with subfolders
mkdir -p logs/backend logs/frontend

# Create scripts directory with README
mkdir scripts
touch scripts/README.md

# Create deployment directory and subfolders
mkdir -p deployment/k8s deployment/nginx deployment/pm2 deployment/terraform

touch deployment/README.md
touch deployment/k8s/README.md deployment/nginx/README.md deployment/pm2/README.md deployment/terraform/README.md

# Create tests directory and subfolders
mkdir -p tests/backend tests/frontend tests/integration tests/e2e tests/unit
touch tests/README.md

# Done
printf "The intelliDGAforge structure has been created successfully.\n"
