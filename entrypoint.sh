#!/usr/bin/env sh

set -e

echo "Waiting for database..."
echo DB_NAME: ${DB_NAME}
echo DB_HOST: ${DB_HOST}
echo DB_PORT: ${DB_PORT}
while ! nc -z ${DB_HOST} ${DB_PORT}; do sleep 1; done
echo "Connected to database."

NODE_ENV=development npm run migrate:up
npm run build

cp -r ./src/docs/ ./dist/docs/
node --env-file=.env.dev dist/server.js