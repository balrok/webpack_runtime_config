FROM node:9 as build-stage

ENV NODE_ENV production

RUN yarn global add serve@9.4.x -T
COPY yarn.lock package.json /frontend/
WORKDIR /frontend/
RUN yarn install

COPY .env /frontend/.env
COPY src /frontend/src
COPY public /frontend/public
COPY docker/reset_env.sh /frontend/docker/reset_env.sh

RUN eval $(/frontend/docker/reset_env.sh) \
    && yarn build

COPY docker/entrypoint.sh /frontend/docker/entrypoint.sh

FROM nginx:1.15

RUN apt-get update && \
        apt-get --yes install file && \
        apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV PUBLIC_URL http://localhost:3000
ENV REACT_APP_VAR1 var1.dock
ENV REACT_APP_VAR2 var2.dock


COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /frontend/ /frontend
WORKDIR /frontend


EXPOSE 3000

ENTRYPOINT ["/bin/bash", "/frontend/docker/entrypoint.sh"]
