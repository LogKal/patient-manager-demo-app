FROM node

WORKDIR /ui

COPY package.json package.json
COPY package-lock.json package-lock.json

#executes inside of image
RUN npm install

#used to run prod build
RUN npm install -g serve
ENV REACT_APP_API_URL http://localhost:8080

#copy all sources
COPY . .
RUN npm run build

CMD ["serve", "-s", "build"]

