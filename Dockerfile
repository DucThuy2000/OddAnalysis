# Stage 1: Build Angular application
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

# Copy the rest of the application files
COPY . .

# Limit Node.js memory usage during build
RUN node --max_old_space_size=1024 ./node_modules/.bin/ng build --configuration production

# Stage 2: Serve app with Nginx
FROM nginx:latest

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular files from build stage
COPY --from=build /app/dist/odds_analysis/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
