FROM nginx:alpine
LABEL maintainer="Nalberthy Sousa - nalberthyuf@gmail.com"

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./www/ /usr/share/nginx/html
