# --------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------



# Etapa 1: Construir la imagen de la aplicación y copiar los archivos necesarios
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .

# Etapa 2: Ejecutar los tests
FROM build AS test
RUN npm test

# Etapa 3: Crear la imagen final de producción
FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app .

# Especificar el comando por defecto para iniciar la aplicación
CMD ["npm", "start"]


# --------------------------------------------------------------------------------
