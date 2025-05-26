#!/bin/bash

# Production
#
git reset --hard
git checkout develop
git pull origin develop

# docker compose up -d --no-deps --build
docker compose stop
docker compose rm -f
docker compose up -d
