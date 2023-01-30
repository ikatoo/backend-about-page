FROM node:18.13.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm ci --only=production

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]