# Usa una imagen base de Node.js
FROM node:18-slim

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración y dependencias
COPY package.json ./

# Instala las dependencias, incluyendo `serve`
RUN npm install --only=production

# Copia la carpeta de compilación de la aplicación de Vue.js
COPY dist ./dist

# Expone el puerto por defecto de Cloud Run
EXPOSE 8080

# Comando para iniciar el servidor de archivos estáticos
CMD ["npm", "start"]