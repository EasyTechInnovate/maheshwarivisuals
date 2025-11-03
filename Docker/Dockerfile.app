# Base node image for user app
FROM node:22-alpine AS app-base
WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Development stage
FROM app-base AS app-development
RUN npm install
COPY app .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage for QA and production
FROM app-base AS app-build
RUN npm install
COPY app .
RUN npm run build

# QA stage with nginx
FROM nginx:stable-alpine AS app-qa
COPY --from=app-build /app/dist /usr/share/nginx/html
COPY Docker/nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Production stage with nginx
FROM nginx:stable-alpine AS app-production
COPY --from=app-build /app/dist /usr/share/nginx/html
COPY Docker/nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]