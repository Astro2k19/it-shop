FROM node:20-alpine3.18

RUN npm i -g pnpm && \
    apk add --no-cache \
    dumb-init=1.2.5-r2
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
EXPOSE 3500
CMD ["pnpm", "nx", "run", "api-migration:serve"]
