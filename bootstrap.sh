#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOGDIR="$DIR/logs/"

export RADAR_AB2L_HTTP_PORT="3000"
export RADAR_AB2L_DATABASE_DSN="mongodb://localhost:27017/radar-ab2l"
export RADAR_AB2L_REDIS_DSN="redis://127.0.0.1:6380/'"
export RADAR_AB2L_ADDRESS_API="http://localhost:3000/"
export RADAR_AB2L_ADDRESS="http://localhost:1337/"
export RADAR_AB2L_CLOUDINARY_NAME="radarab2l"
export RADAR_AB2L_CLOUDINARY_KEY="BZK551hFXYmOddavBBmz2u5GqoI"
export RADAR_AB2L_MAILGUN_DOMAIN="bipbop.com.br"

source secrets.sh

mongod --dbpath database/ 2>&1 | tee -a "$LOGDIR/mongod.log" &
yarn run nodemon ./server.js 2>&1 | tee -a "$LOGDIR/server-devel.log" &
yarn run dev -p 1337 2>&1 | tee -a "$LOGDIR/next.log" &
yarn run ngrok http 1337 2>&1 | tee -a "$LOGDIR/ngrok.log" &

wait
