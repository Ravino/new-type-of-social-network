#!/bin/bash

set -e

BUILD_ONLY=${1:-""}
IMAGE_NAME=${2:-"eu-central-1-test-plizi-front-nginx"}
BUILD_FILE_PATH=${4:-"docker/front-nginx"}
BUILD_VERSION=$(date +"%s")
#$(git rev-parse --short HEAD)

echo "START Update frontend docker image [ BUILD_ONLY = ${BUILD_ONLY} ] @ "`date`

cd frontend/
if [ -z $BUILD_ONLY ]; then
	aws ecr get-login-password --region eu-central-1 | sudo docker login --username AWS --password-stdin 884088487044.dkr.ecr.eu-central-1.amazonaws.com
fi
sudo docker build \
-t "${IMAGE_NAME}:latest" \
-f ${BUILD_FILE_PATH}/Dockerfile \
--build-arg VERSION=${BUILD_VERSION} .
if [ -z $BUILD_ONLY ]; then
	sudo docker tag eu-central-1-test-plizi-front-nginx:latest 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-front-nginx:latest
	sudo docker push 884088487044.dkr.ecr.eu-central-1.amazonaws.com/eu-central-1-test-plizi-front-nginx:latest
fi

echo "FINISH Update frontend docker image @ "`date`

exit 0