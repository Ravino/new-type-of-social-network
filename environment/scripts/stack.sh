#!/bin/bash

# configurations
PROJECT_NAME="plizi-2"
ENV="test"
REGION="eu-central-1"
# stack names
STACK_NAME="${PROJECT_NAME}-${ENV}"
RESOURCE_NAME="${REGION}-${ENV}"
SERVICE_STACK_PREFIX="${REGION}-${ENV}-${PROJECT_NAME}"
# roles and permissions
ARN_ROLE_NAME="CloudFormationMasterRole"
ARN_ROLE="arn:aws:iam::884088487044:role/"${ARN_ROLE_NAME}
CLIENT_REQUEST_TOKEN="${REGION}${PROJECT_NAME}${ENV}${ARN_ROLE_NAME}"
# parameters
TEMPLATE_PATH="file://../templates/pipeline.yml"
PARAMETERS="ParameterKey=EnvironmentName,ParameterValue=test"

# functions
function create {
    aws cloudformation create-stack \
    --stack-name ${STACK_NAME} \
    --template-body ${TEMPLATE_PATH} \
    --parameters ${PARAMETERS} \
    --role-arn ${ARN_ROLE} \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --disable-rollback \
    --no-enable-termination-protection \
    --timeout-in-minutes 60 \
    --client-request-token ${CLIENT_REQUEST_TOKEN}
}
function update {
    aws cloudformation update-stack \
    --stack-name ${STACK_NAME} \
    --capabilities CAPABILITY_NAMED_IAM \
    --template-body=${TEMPLATE_PATH} \
    --parameters ${PARAMETERS} \
    --role-arn ${ARN_ROLE}
}
function delete {
    # removing application service stacks

    # removing resources stacks
    aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-mysql --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-redis --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-mongo --role-arn ${ARN_ROLE}
    # removing application cluster stacks
    aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-resources --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-cluster --role-arn ${ARN_ROLE}
    # remove main stack name - shouldn't remove before another res are removed
    #aws cloudformation delete-stack --stack-name ${STACK_NAME} --role-arn ${ARN_ROLE}
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-api
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-queue-worker
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-ws
    aws codebuild delete-project --name ${STACK_FULL_NAME}-front-nginx
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-api --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-queue-worker --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-ws --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-front-nginx --force
}
function upload() {
    aws cloudformation package --template /path_to_template/template.json --s3-bucket mybucket --output yaml > packaged-template.yml
}
# $1 CREATE_COMPLETE
function stack-list-all() {
    aws cloudformation list-stacks --stack-status-filter $1
}

# $1 stack name
function stack-list-running() {
    aws cloudformation describe-stacks --stack-name $1
}

`$@`

echo 0
