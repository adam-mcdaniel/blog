# # Use an official Node runtime as the base image
# FROM node:18.17.1-alpine3.18

# Set the tag for the base image
# Use x86_64 architecture for the base image
FROM --platform=linux/amd64 node:18.17.1-bookworm

# Set the working directory in the container
WORKDIR /app

# Install npm
RUN echo "Hello, World!"

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install

# Install Gatsby globally
RUN npm install -g gatsby-cli@5.11.0

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000
EXPOSE 8000

# Build the Gatsby application
CMD ["npm", "run", "build"]

# Now copy the built application back to the host


# Start the Gatsby development server
# CMD ["gatsby", "develop", "-H", "0.0.0.0"]
