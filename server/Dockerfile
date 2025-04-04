# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del backend
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto que usa el backend
EXPOSE 5000

# Comando por defecto para iniciar la app
CMD ["npm", "start"]
