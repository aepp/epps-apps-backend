#!/usr/bin/env bash

KEEP_RELEASES=3
APP_ROOT=/usr/docker/containers/epps-apps.com
RELEASE_NAME=$(date '+%Y_%m_%d_%H_%M_%S')
DEPLOY_SERVER_URL=epps-apps.com

ssh-keyscan -H ${DEPLOY_SERVER_URL} >> ~/.ssh/known_hosts
ssh deploy@${DEPLOY_SERVER_URL} "mkdir ${APP_ROOT}/temp_be"
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress \
    dist_server .dockerignore .env docker-cmd.sh docker-compose.yml Dockerfile package.json \
    graphql.config.json graphql.schema.json \
    deploy@epps-apps.com:${APP_ROOT}/temp_be
ssh deploy@${DEPLOY_SERVER_URL} "mkdir -p $APP_ROOT/releases_be/$RELEASE_NAME; mv $APP_ROOT/temp_be/* $APP_ROOT/releases_be/$RELEASE_NAME; rm -rf $APP_ROOT/temp_be; rsync -a -v $APP_ROOT/releases_be/$RELEASE_NAME/* $APP_ROOT/root/; cd $APP_ROOT/releases_be && ls -1tr | head -n -$KEEP_RELEASES | xargs -d '\n' rm -rf --; cd $APP_ROOT/root && docker-compose up -d --build --force-recreate"
