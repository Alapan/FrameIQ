FROM node:24-alpine

WORKDIR /

COPY package*.json ./
RUN npm ci

COPY . .
CMD ["npm", "start"]
