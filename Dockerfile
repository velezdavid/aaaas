# # Usa la imagen de node como base
# FROM node:14-alpine

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




# # Stage 1 - Construir
# FROM node:14-alpine AS builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --quiet
# COPY . .
# RUN npm run build

# # Stage 2 - Compilar
# FROM node:14-alpine AS compiler
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --quiet --production
# COPY --from=builder /usr/src/app/dist ./dist
# COPY src/models ./src/models
# COPY src/controllers ./src/controllers
# COPY src/app.js ./src/app.js
# RUN npm run test

# # Stage 3 - Producción
# FROM node:14-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --quiet --production
# COPY --from=compiler /usr/src/app/dist ./dist
# COPY src/models ./src/models
# COPY src/controllers ./src/controllers
# COPY src/app.js ./src/app.js
# CMD ["node", "./dist/app.js"]


# Stage 1 - Construir la app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Ejecutar pruebas

FROM build AS test
ENV NODE_ENV=test
RUN npm run test

# Stage 3 - Producción
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=build /app/dist ./dist
CMD ["node", "run", "./dist/app.js"]



