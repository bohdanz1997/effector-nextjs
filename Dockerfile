FROM node:14

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./yarn.lock /usr/src/app/yarn.lock

RUN yarn

COPY . /usr/src/app

RUN yarn build
CMD yarn start
