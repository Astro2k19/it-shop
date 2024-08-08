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
ENV API_URL=${API_URL}
RUN pnpm i

COPY /apps/client ./apps/client
COPY /libs ./libs
EXPOSE 4200
CMD ["pnpm", "nx", "run", "client:serve"]
