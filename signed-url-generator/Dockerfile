FROM node:24-alpine

WORKDIR /

COPY package*.json .
RUN npm install

EXPOSE 8000

CMD ["npm", "run", "start"]
