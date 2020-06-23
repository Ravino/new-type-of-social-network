#!/bin/bash
ARN_ADMIN="arn:aws:iam::884088487044:role/CloudFormationMasterRole"
STACK_NAME="plizi"
ENV="dev"
CLIENT_TOKEN="ClientRequestToken1"

aws cloudformation delete-stack --stack-name eu-central-1-test-plizi-cluster --role-arn ${ARN_ADMIN}
aws cloudformation delete-stack --stack-name eu-central-1-dev-plizi-cluster --role-arn ${ARN_ADMIN}
