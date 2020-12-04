#!/usr/bin/env bash
set -e

# Up project
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

docker system prune --volumes -f

sleep 10
