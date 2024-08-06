FROM node:20-alpine3.18

RUN npm i -g pnpm && \
    apk add --no-cache \
    dumb-init=1.2.5-r2 \
    curl

# Install dockerize
RUN curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xzv

RUN npm add --global nx@latest

WORKDIR /src
COPY package.json \
    tsconfig* \
    nx.json \
    pnpm-lock.yaml \
    ./
ENV CYPRESS_INSTALL_BINARY=0
RUN pnpm i

COPY /apps/api-migration ./apps/api-migration
COPY /prisma ./prisma
COPY /libs ./libs

RUN npx prisma generate

#makes your API container wait until it can establish a connection to MongoDB on port 27017. If MongoDB isn’t ready within 60 seconds, it will timeout.
CMD ["sh", "-c", "dockerize -wait tcp://db:27017 -timeout 60s && pnpm run prisma:push:dev && pnpm run prisma:seed:dev && pnpm nx run api-migration:serve"]
