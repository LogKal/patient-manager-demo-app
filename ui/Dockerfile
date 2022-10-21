FROM node

WORKDIR /ui

COPY package.json package.json
COPY package-lock.json package-lock.json

#executes inside of image
RUN npm install

#copy all sources
COPY . .
RUN npm run build

CMD ["npm", "run", "startProd"]

