#!/bin/bash
ARN_ADMIN="arn:aws:iam::884088487044:role/CloudFormationMasterRole"
STACK_NAME="plizi"
ENV="test"
CLIENT_TOKEN="ClientRequestToken1"
REGION="eu-central-1"
STACK_FULL_NAME="${REGION}-${ENV}-${STACK_NAME}"

aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-mongo --role-arn=${ARN_ADMIN}
aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-mysql --role-arn=${ARN_ADMIN}
aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-redis --role-arn=${ARN_ADMIN}
aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-resources --role-arn=${ARN_ADMIN}
aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-cluster --role-arn=${ARN_ADMIN}
exit;
aws cloudformation delete-stack --stack-name ${STACK_NAME}
aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-api
aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-queue-worker
aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-ws
aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-front-nginxS
