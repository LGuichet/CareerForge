FROM node:24
RUN npm install -g json-server
WORKDIR /data
COPY rest/db.json /data/db.json
EXPOSE 3000
CMD ["json-server", "--watch", "/data/db.json", "--host", "0.0.0.0"]