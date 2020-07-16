#!/bin/bash

echo "START Update frontend docker image @ "`date`

cd frontend/
aws ecr get-login-password --region eu-central-1 | sudo docker login --username AWS --password-stdin 884088487044.dkr.ecr.eu-central-1.amazonaws.com
sudo docker build -t eu-central-1-test-plizi-front-nginx:latest -f docker/front-nginx/Dockerfile .
sudo docker tag eu-central-1-test-plizi-front-nginx:latest 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-front-nginx:latest
sudo docker push 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-front-nginx:latest

echo "FINISH Update frontend docker image @ "`date`

exit 0