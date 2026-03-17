# Dockerfile.app
# Sert l'application DigitalBank via nginx
FROM nginx:alpine

# Copie l'application dans le dossier de nginx
COPY app/ /usr/share/nginx/html/

# Expose le port 80
EXPOSE 80