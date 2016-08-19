FROM node:6.3.1

RUN mkdir -p /data
COPY ./ /data
WORKDIR /data

RUN npm install -g grunt-cli bower
RUN npm install
RUN bower install --allow-root

EXPOSE 9000

CMD ["grunt", "serve:dist"]
