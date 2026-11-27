FROM nginx:1.27-alpine

COPY *.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY video/ /usr/share/nginx/html/video/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
