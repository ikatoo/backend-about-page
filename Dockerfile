FROM node:18.13-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
