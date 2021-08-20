#!/bin/bash
set -e

nohup yarn build:dev </dev/null &

yarn dev

exec "$@"
