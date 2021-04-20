#!/bin/bash

# stop containers
# DO NOT MODIFY docker-compose before stopping containers

cd ./deployment

docker-compose stop
cd ..
# show informations about running containers
docker ps
