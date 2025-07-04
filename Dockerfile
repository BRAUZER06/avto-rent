FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5175

ENV HOSTNAME=0.0.0.0
ENV PORT=5175

CMD ["npm", "run", "dev"]