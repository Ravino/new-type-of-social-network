#!/bin/bash
SERVICE_NAME="CloudFormation"
if [ ! -z $1 ]; then
    SERVICE_NAME=$1
fi
echo "Creating service-linked role for service: $SERVICE_NAME"

SERVICE_ROLE_SUFFIX="PLIZI"
if [ ! -z $2 ]; then
    SERVICE_ROLE_SUFFIX=$2
fi
echo "Custom suffix for role is: $SERVICE_ROLE_SUFFIX"

aws iam create-service-linked-role \
    --aws-service-name ${SERVICE_NAME}.amazonaws.com \
    --custom-suffix ${SERVICE_ROLE_SUFFIX} \
    --description "Service-linked role for Amazon service with name ${SERVICE_NAME}"

exit 0;
