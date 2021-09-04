#!/bin/bash
set -e

#nohup yarn build:dev --watch </dev/null &
yarn dev:docker

exec "$@"
