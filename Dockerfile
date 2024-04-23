# Stage 1: Build Angular application
FROM node:latest as build

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Stage 2: Serve app with Nginx
FROM nginx:latest

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular files
COPY --from=build /app/dist/odds_analysis/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
