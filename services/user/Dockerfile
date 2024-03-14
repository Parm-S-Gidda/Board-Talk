FROM node:alpine
WORKDIR /usr/user
COPY package.json .
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
RUN npm run build
CMD ["node", "./dist/src/app.js"]