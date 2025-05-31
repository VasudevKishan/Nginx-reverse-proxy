FROM node:22

WORKDIR /bookmark

COPY server.js .
COPY index.html .
COPY package.json .
COPY css ./css
COPY images ./images
COPY script ./script

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]