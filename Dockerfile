FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app

EXPOSE 3000 
CMD [ "node", "index.js" ]
