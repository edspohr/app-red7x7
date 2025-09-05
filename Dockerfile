# Use a Node.js base image
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the dist folder and its contents
COPY dist ./dist

# Copy the server file
COPY server.js ./

# Expose the port
EXPOSE 8080

# Run the server
CMD ["node", "server.js"]