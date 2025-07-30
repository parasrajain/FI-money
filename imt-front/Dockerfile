# Development build for React/Vite app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create necessary directories and set permissions
RUN mkdir -p node_modules/.vite && \
    chmod -R 755 node_modules && \
    chmod -R 755 /app

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]