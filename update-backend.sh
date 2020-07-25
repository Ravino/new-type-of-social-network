#!/bin/bash

echo "START Update frontend docker image @ "`date`

cd backend/
aws ecr get-login-password --region eu-central-1 | sudo docker login --username AWS --password-stdin 884088487044.dkr.ecr.eu-central-1.amazonaws.com
sudo docker build -t laravel-docker:latest -f docker/Dockerfile .
sudo docker tag laravel-docker:latest 884088487044.dkr.ecr.eu-central-1.amazonaws.com/laravel-docker:latest
sudo docker push 884088487044.dkr.ecr.eu-central-1.amazonaws.com/laravel-docker:latest

echo "FINISH Update frontend docker image @ "`date`

exit 0