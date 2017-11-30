FROM node:8.7-alpine

WORKDIR /home/app

COPY package*.json ./
RUN npm install
COPY . /home/app

CMD ["npm", "start"]

EXPOSE 8080
