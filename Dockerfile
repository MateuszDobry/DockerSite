
FROM node:22

#work directory
WORKDIR /app


COPY package*.json ./

#installing properties
RUN npm install


COPY . .


ENV PORT=3000


EXPOSE 3000

# starting the server
CMD ["node", "server.js"]
