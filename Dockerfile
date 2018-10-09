FROM node:8-alpine

WORKDIR /opt/monitor

COPY index.js ./index.js
COPY package.json ./package.json
COPY lib ./lib

RUN npm install

CMD node index.js
