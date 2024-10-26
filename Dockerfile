  GNU nano 2.9.3                                                                  Dockerfile                                                                            

# Stage 1: Build Angular application
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Angular application with memory limits
RUN node --max_old_space_size=1024 ./node_modules/@angular/cli/bin/ng build --configuration production

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
