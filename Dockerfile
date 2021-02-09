FROM alpine
RUN apk add --update nodejs nodejs-npm
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "server"]