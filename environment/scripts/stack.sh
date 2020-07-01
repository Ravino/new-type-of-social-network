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
S3_BUCKET_NAME="${REGION}-${PROJECT_NAME}-${ENV}"

# functions
function validate-one() {
    TEMPLATE=$1
    # Validate the template with CloudFormation
    ERRORS=$(aws cloudformation validate-template --template-body file://../templates/$TEMPLATE 2>&1 >/dev/null);
    if [ "$?" -gt "0" ]; then
        ((ERROR_COUNT++));
        echo "[fail] $TEMPLATE: $ERRORS";
    else
        echo "[pass] $TEMPLATE";
    fi;
}
function validate() {
    cd "../templates/"
    for TEMPLATE in $(find . -name '*.yml'); do
        # Validate the template with CloudFormation
        ERRORS=$(aws cloudformation validate-template --template-body file://../templates/$TEMPLATE 2>&1 >/dev/null);
        if [ "$?" -gt "0" ]; then
            ((ERROR_COUNT++));
            echo "[fail] $TEMPLATE: $ERRORS";
        else
            echo "[pass] $TEMPLATE";
        fi;
    done;
}
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
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --template-body=${TEMPLATE_PATH} \
    --parameters ${PARAMETERS} \
    --role-arn ${ARN_ROLE}
}
function delete {
    # removing application service stacks
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-ws --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-queue-worker --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-api --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-front-nginx --role-arn ${ARN_ROLE}
    # removing resources stacks
    # aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-mysql --role-arn ${ARN_ROLE}
    # aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-redis --role-arn ${ARN_ROLE}
    # aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-mongo --role-arn ${ARN_ROLE}
    # # removing application cluster stacks
    # aws cloudformation delete-stack --stack-name ${RESOURCE_NAME}-resources --role-arn ${ARN_ROLE}
    # aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-cluster --role-arn ${ARN_ROLE}
    # # remove main stack name - shouldn't remove before another res are removed
    # #aws cloudformation delete-stack --stack-name ${STACK_NAME} --role-arn ${ARN_ROLE}
    # # remove codebuild projects
    # aws codebuild delete-project --name ${PROJECT_NAME}-${REGION}-back-api-${ENV}
    # aws codebuild delete-project --name ${PROJECT_NAME}-${REGION}-back-queue-worker-${ENV}
    # aws codebuild delete-project --name ${PROJECT_NAME}-${REGION}-back-ws-${ENV}
    # aws codebuild delete-project --name ${PROJECT_NAME}-${REGION}-front-nginx-${ENV}
    # # remove ecr repositories
    # aws ecr delete-repository --repository-name ${SERVICE_STACK_PREFIX}-back-api --force
    # aws ecr delete-repository --repository-name ${SERVICE_STACK_PREFIX}-back-queue-worker --force
    # aws ecr delete-repository --repository-name ${SERVICE_STACK_PREFIX}-back-ws --force
    # aws ecr delete-repository --repository-name ${SERVICE_STACK_PREFIX}-front-nginx --force
    # # remove s3
    # aws s3 rb ${S3_BUCKET_NAME} --force
}
function delete-service-stacks {
    # removing application service stacks
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-ws --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-queue-worker --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-back-api --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${SERVICE_STACK_PREFIX}-front-nginx --role-arn ${ARN_ROLE}
}

RESULTS=`$@`
echo $RESULTS

exit 0
