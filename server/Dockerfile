# Financial API Server Docker Configuration

# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Redis client dependencies
RUN apk add --no-cache redis

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S financial-api -u 1001

# Change ownership
RUN chown -R financial-api:nodejs /app
USER financial-api

# Expose ports
EXPOSE 3001 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start Redis and the application
CMD ["sh", "-c", "redis-server --daemonize yes && npm start"]
