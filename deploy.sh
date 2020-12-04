#!/usr/bin/env bash
set -e

pip3 install awscli
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"

# Build docker image
docker login -u "$DOCKERHUB_USER" -p "$DOCKERHUB_PASSWORD"

docker pull "$REACT_IMAGE":"$APP_VERSION_TAG" || true
docker build -t "$REACT_IMAGE":"$APP_VERSION_TAG" .
docker push "$REACT_IMAGE":"$APP_VERSION_TAG"

# Pull docker image to the server
ssh-keyscan -H "$SSH_SERVER" >> ~/.ssh/known_hosts
ssh "$SSH_USER"@"$SSH_SERVER" "cd /home/ubuntu/app; git pull origin master && ./pull-and-up-images.sh"
