# Etapa de construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa de servidor web (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
# Nota: Ajusta 'frontend/browser' según el nombre de tu proyecto en angular.json
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
