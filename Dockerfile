# Use the official Node.js image as the base image
FROM node:latest

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn

# Copy the rest of the application files to the container
COPY . .

# Install Chromium
RUN apt-get update && apt-get install -y chromium && ln -sf /usr/bin/chromium /usr/local/bin/chromium

# Expose port 3000 to the host
EXPOSE 3000

# Start the server
CMD ["yarn", "start"]