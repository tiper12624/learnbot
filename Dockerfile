FROM node:14-alpine

ENV NODE_ENV=production
ENV PORT=8080
ENV SESSION_TIMEOUT=1440

RUN apk add --no-cache yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
                    autoconf \
                    automake \
                    g++ \
                    libtool \
                    make \
                    python \
    && yarn install \
    && apk del .gyp

COPY . ./

EXPOSE 8080

CMD ["yarn", "start"]