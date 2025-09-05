# Usa una imagen base oficial de Node.js
FROM node:18-slim

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto donde la app escuchará
EXPOSE 8080

# Comando para iniciar el servidor
CMD [ "npm", "start" ]