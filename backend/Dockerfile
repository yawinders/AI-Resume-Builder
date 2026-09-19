FROM node:22

# Prevent interactive prompts
# ENV DEBIAN_FRONTEND=noninteractive

# Update Ubuntu and install required packages
# RUN apt-get update && \
#     apt-get install -y curl ca-certificates && \
#     rm -rf /var/lib/apt/lists/*

# # Install Node.js 22.x
# RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
#     apt-get install -y nodejs && \
#     rm -rf /var/lib/apt/lists/*

# # Check Node and npm versions
# RUN node --version && npm --version

# Create application directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Your Node app port
EXPOSE 3000

# Start application
CMD ["npm", "start"]