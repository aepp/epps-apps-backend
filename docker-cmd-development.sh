#!/bin/bash
set -e

nohup yarn build:dev </dev/null &

yarn dev

if [ '(tar -cf - /usr/local/share/.cache/yarn/v2 | crc32)' != '(tar -cf - .yarn_cache | crc32)' ]; then
    cp -r /usr/local/share/.cache/yarn/v2/. .yarn_cache/;
fi

exec "$@"
