FROM node:6.3.1

COPY ./ /app

WORKDIR /app

RUN npm install
RUN npm install -g grunt-cli bower
RUN bower install --allow-root

EXPOSE 9000

CMD ["grunt", "backend:mock", "serve:dist"]