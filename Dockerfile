FROM node:latest

WORKDIR /app

COPY first_api/ .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]