# Step 1: Build the Angular app
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Step 2: Serve the Angular app using NGINX
FROM nginx:alpine

# Copy the Angular dist output to the NGINX public folder
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Optional: replace NGINX default config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
