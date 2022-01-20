FROM node:14-alpine

ENV NODE_ENV=production
ENV PORT=3000
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
                    python3 \
    && yarn install \
    && apk del .gyp

COPY . ./

EXPOSE 3000

HEALTHCHECK --timeout=3s --start-period=1m \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["yarn", "start"]
