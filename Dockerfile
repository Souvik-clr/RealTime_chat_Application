# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything (except what's specified in .dockerignore) to the container
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the application
CMD ["node", "server.js"]
