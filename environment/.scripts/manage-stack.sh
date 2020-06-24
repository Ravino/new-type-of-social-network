#!/bin/bash
# configurations
PROJECT_NAME="plizi"
ENV="test"
REGION="eu-central-1"
STACK_NAME="${PROJECT_NAME}-${ENV}"
STACK_FULL_NAME="${REGION}-${STACK_NAME}"
ARN_ROLE_NAME="CloudFormationMasterRole"
ARN_ROLE="arn:aws:iam::884088487044:role/"${ARN_ROLE_NAME}
CLIENT_REQUEST_TOKEN="${REGION}${PROJECT_NAME}${ENV}${ARN_ROLE_NAME}"
TEMPLATE_PATH="file://templates/pipeline.yml"
PARAMETERS="ParameterKey=EnvironmentName,ParameterValue=test"
# functions
function create {
    aws cloudformation create-stack \
    --stack-name ${STACK_NAME} \
    --template-body ${TEMPLATE_PATH} \
    --parameters ${PARAMETERS} \
    --role-arn ${ARN_ADMIN} \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --disable-rollback \
    --no-enable-termination-protection \
    --timeout-in-minutes 60 \
    --client-request-token ${CLIENT_TOKEN}
}
function update {
    aws cloudformation update-stack \
    --stack-name ${STACK_NAME} \
    --template-body=${TEMPLATE_PATH} \
    --parameters ${PARAMETERS} \
    --role-arn ${ARN_ADMIN}
}
function delete {
    echo "stacks before: " && aws cloudformation describe-stacks --query "Stacks[].StackName" --output text --starting-token ${STARTING_TOKEN}

    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-mysql --role-arn ${ARN_ADMIN}
    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-redis --role-arn ${ARN_ADMIN}
    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-resources --role-arn ${ARN_ADMIN}
    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-cluster --role-arn ${ARN_ADMIN}
    aws cloudformation delete-stack --stack-name ${STACK_NAME} --role-arn ${ARN_ADMIN}
    exit 1
    echo "projects before: " && aws codebuild describe-projects --query "Projects[].ProjectName" --output text
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-api
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-queue-worker
    aws codebuild delete-project --name ${STACK_FULL_NAME}-back-ws
    aws codebuild delete-project --name ${STACK_FULL_NAME}-front-nginx
    echo "repositories before: " && aaws ecr describe-repositories --query "Repositories[].RepositoryName" --output text
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-api --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-queue-worker --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-back-ws --force
    aws ecr delete-repository --repository-name ${STACK_FULL_NAME}-front-nginx --force
}

`$1`

echo 0
