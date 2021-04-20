#!/bin/bash

# run locally
# npm run start-dev

cd ./deployment
# run containers in background
docker-compose up -d
cd ..
# show informations about running containers
docker ps

# stop containers
# DO NOT MODIFY docker-compose before stopping containers
# docker-compose stop

