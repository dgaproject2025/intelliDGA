#!/bin/bash
# git_setup.sh - Automates local Git repository initialization and push to remote.
#
# Usage:
#   ./git_setup.sh <remote-repository-url>
#
# Example:
#   ./git_setup.sh https://github.com/username/intelliDGAforge.git
#
# The script must be executed inside the root directory of your local project.

REMOTE_URL="$1"
if [ -z "$REMOTE_URL" ]; then
    echo "Error: remote repository URL not provided."
    echo "Usage: $0 <remote-repository-url>"
    exit 1
fi

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing local git repository..."
    git init
fi

# Stage all files
echo "Staging files..."
git add .

# Commit with a standard message
echo "Committing files..."
git commit -m "Initial commit" || echo "Nothing to commit (perhaps initial commit already exists)."

# Rename current branch to main
echo "Setting branch to main..."
git branch -M main

# Add or update remote origin
if git remote get-url origin > /dev/null 2>&1; then
    echo "Updating existing remote 'origin' URL..."
    git remote set-url origin "$REMOTE_URL"
else
    echo "Adding remote 'origin'..."
    git remote add origin "$REMOTE_URL"
fi

# Push to remote repository
echo "Pushing to remote repository..."
git push -u origin main
