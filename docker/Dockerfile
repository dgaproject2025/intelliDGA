# Use an official Node runtime as the base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY backend/. .

# Expose API port
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]
