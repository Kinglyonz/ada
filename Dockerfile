FROM node:18-alpine

WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
# Install production dependencies
# Note: If you need build tools for native modules (like sqlite3), you might need:
# RUN apk add --no-cache python3 make g++ 
RUN npm ci --only=production

# Copy source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

CMD ["node", "server.js"]
