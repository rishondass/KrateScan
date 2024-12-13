FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

ARG MONGODB_URL

ENV MONGODB_URL=$MONGODB_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]