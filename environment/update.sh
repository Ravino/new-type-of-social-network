#!/bin/bash
ARN_ADMIN="arn:aws:iam::884088487044:role/CloudFormationMasterRole"
STACK_NAME="plizi"
ENV="test"
CLIENT_TOKEN="ClientRequestTokenPliziTest"

aws cloudformation update-stack \
--stack-name ${STACK_NAME} \
--template-body=file://templates/pipeline.yml \
--parameters ParameterKey=EnvironmentName,ParameterValue=${ENV} \
--role-arn ${ARN_ADMIN} \
--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
