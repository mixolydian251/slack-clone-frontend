
# Dockerfile goes inside root directory generally named 'Dockerfile'

# Insert minimum viable image

FROM node:8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server/server.js"]

