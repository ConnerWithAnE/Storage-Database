from node:latest

EXPOSE 8080

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install express --save
RUN npm install mongodb --save

COPY server.js /usr/src/app/server.js
COPY /public /usr/src/app/public

CMD ["node", "server.js"]

