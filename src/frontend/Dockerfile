# Multi-stage Frontend Dockerfile
# Build stage
FROM node:18-alpine AS build

# Build arguments for environment variables
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_GOOGLE_MAPS_API_KEY
ARG REACT_APP_ENVIRONMENT=production

# Set environment variables for build
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_GOOGLE_MAPS_API_KEY=$REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

# Copy custom nginx config
COPY nginx.prod.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=build /app/build /usr/share/nginx/html

# Set permissions
RUN chown -R reactuser:nodejs /usr/share/nginx/html && \
    chown -R reactuser:nodejs /var/cache/nginx && \
    chown -R reactuser:nodejs /var/log/nginx && \
    chown -R reactuser:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R reactuser:nodejs /var/run/nginx.pid

# Switch to non-root user
USER reactuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
