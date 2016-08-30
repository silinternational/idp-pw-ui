FROM node:6.3.1

RUN mkdir -p /data
COPY ./ /data
WORKDIR /data

RUN npm install -g grunt-cli bower
RUN npm install
RUN bower install --allow-root

# Had to reinstall the image optimizer because of some strange permission
# issues with optipng inside a Docker container.
RUN npm uninstall grunt-contrib-imagemin
RUN npm install grunt-contrib-imagemin

EXPOSE 9000

CMD ["grunt", "serve:dist"]
