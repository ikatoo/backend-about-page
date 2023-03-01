FROM node:18.13-alpine

ARG PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
