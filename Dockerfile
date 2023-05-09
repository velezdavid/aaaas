# # Usa la imagen de node como base
# FROM node:16-alpine

# # Establece el directorio de trabajo
# WORKDIR /app

# # Copia el package.json y package-lock.json al directorio de trabajo
# COPY package*.json ./

# # Instala las dependencias
# RUN npm install

# # Copia el resto del código al directorio de trabajo
# COPY . .

# # Expone el puerto 3000
# EXPOSE 3000

# # Inicia la aplicación
# CMD [ "npm", "start" ]



# Stage 1 - Construir
FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run build

# Stage 2 - Compilar y ejecutar pruebas
FROM builder AS tester
WORKDIR /usr/src/app
RUN npm ci --quiet --only=development
COPY . .
RUN npm run test

# Stage 3 - Producción
FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --quiet --production
COPY --from=builder /usr/src/app/dist ./dist
CMD ["node", "./dist/app.js"]