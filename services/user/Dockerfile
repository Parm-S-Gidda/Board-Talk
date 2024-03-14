FROM node:alpine
WORKDIR /usr/user
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run build
CMD ["node", "./dist/app.js"]