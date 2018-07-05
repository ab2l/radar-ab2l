#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOGDIR="$DIR/logs/"

export RADAR_AB2L_HTTP_PORT="3000"
export RADAR_AB2L_DATABASE_DSN="mongodb://localhost:27017/radar-ab2l"
export RADAR_AB2L_REDIS_DSN="redis://127.0.0.1:6379/0'"
export RADAR_AB2L_ADDRESS_API="http://radar.ab2l.org.br/api/"
export RADAR_AB2L_ADDRESS="http://radar.ab2l.org.br/"
export RADAR_AB2L_CLOUDINARY_NAME="radarab2l"
export RADAR_AB2L_CLOUDINARY_KEY="794954819776291"
export RADAR_AB2L_MAILGUN_DOMAIN="radar.ab2l.org.br"

source secrets.sh

mongod --dbpath database/ 2>&1 | tee -a "$LOGDIR/mongod.log" &
yarn run nodemon ./server.js 2>&1 | tee -a "$LOGDIR/server-devel.log" &
yarn run dev -p 1337 2>&1 | tee -a "$LOGDIR/next.log" &

wait
