#!/bin/bash

PORT=4999

docker build -t backend/testnode .

echo "Using port $PORT"
docker run --net=infra-network -p $PORT:8080 -d backend/testnode

# if you want to enter the container
# docker exec -it <container_id> /bin/bash

#curl -i localhost:$PORT


