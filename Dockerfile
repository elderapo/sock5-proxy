FROM node:alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY patches ./patches

RUN set -ex; \
    if [ "$NODE_ENV" = "production" ]; then \
    yarn install --no-cache --frozen-lockfile --production; \
    elif [ "$NODE_ENV" = "test" ]; then \
    yarn install --no-cache --frozen-lockfile; \
    else \
    yarn install; \
    fi;

CMD ["yarn", "start"]