#!/bin/bash

# enable debug mode
#set -o errexit -o xtrace

# util functions
function datetime() { echo $(date '+%Y-%m-%d %H:%M:%S'); }
function timefile()  { echo $(date '+%Y-%m-%d_%H-%M-%S'); }
function timestamp() { echo $(date +"%s"); }

# TODO: replace on lib import
# $1 filename, $2 contents
function __file-write() { echo "${2}" >> ${1}; }
# $1 filename, # echo: file contents
function __file-read() { contents=`cat ${1}`; echo $contents; }
# $1 filename
function __file-remove() { rm ${1}; }
# $1 file to write
# $2 line to append
function __file-append() { echo $2 | tee -a $1 > /dev/null; }

# start now
function usage() {
    echo "================================================="
    echo "Usage flow for cases: "
    echo "[1] Validate application flow: "
    echo "$ bash app.sh validate"
    echo "$ bash app.sh validate-one <TEMPLATE_NAME>"
    echo "[1] Create application flow: "
    echo "$ bash app.sh create"
    echo "[2] Update application flow: "
    echo "$ bash app.sh update"
    echo "[3] Delete application flow: "
    echo "$ bash app.sh delete-4-services"
    echo "$ bash app.sh delete-3-network"
    echo "$ bash app.sh delete-2-databases"
    echo "$ bash app.sh delete-1-vpc-cluster"
    echo "$ bash app.sh delete-0-stack-resources"
    echo "$ bash app.sh delete-0-stack"
    echo "================================================="
}

ER_OK=0
ER_INTERNAL=1

# process command name
if [ -z $1 ]; then usage; exit $ER_INTERNAL; fi
COMMAND_NAME=$1
echo "PARAM COMMAND_NAME = ${COMMAND_NAME}"
COMMAND_PARAM=${2:-""}
echo "PARAM COMMAND_PARAM = ${COMMAND_PARAM}"

# configurations
PROJECT_NAME="plizi"
ENV="test"
REGION="eu-central-1"
# stack names
STACK_NAME="${PROJECT_NAME}-${ENV}"
ACCOUNT_STACK_NAME_PREFIX="${REGION}-${ENV}"
PROJECT_STACK_NAME_PREFIX="${REGION}-${ENV}-${PROJECT_NAME}"
# roles and permissions
ARN_ROLE_NAME="CloudFormationMasterRole"
ARN_ROLE="arn:aws:iam::884088487044:role/"${ARN_ROLE_NAME}
CLIENT_REQUEST_TOKEN="${REGION}-${PROJECT_NAME}-${ENV}-${ARN_ROLE_NAME}"
# parameters
TEMPLATE_PATH="file://../templates/pipeline.yml"
PARAMETERS="ParameterKey=EnvironmentName,ParameterValue=test"
S3_BUCKET_NAME="${REGION}-${PROJECT_NAME}-${ENV}"

# functions
function validate-one() {
    TEMPLATE=${1:?"Provide template name for valiudation, ex: pipeline.yml"}
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
            echo "FAILED $TEMPLATE: $ERRORS";
        else
            echo "SUCCESS $TEMPLATE";
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
function delete-4-services {
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-back-ws --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-back-api --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-front-nginx --role-arn ${ARN_ROLE}
}
function delete-3-network {
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-nlb --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-alb --role-arn ${ARN_ROLE}
}
function delete-2-databases {
    aws cloudformation delete-stack --stack-name ${ACCOUNT_STACK_NAME_PREFIX}-mysql --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${ACCOUNT_STACK_NAME_PREFIX}-redis --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${ACCOUNT_STACK_NAME_PREFIX}-mongo --role-arn ${ARN_ROLE}
}
function delete-1-vpc-cluster {
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-ecs --role-arn ${ARN_ROLE}
    aws cloudformation delete-stack --stack-name ${PROJECT_STACK_NAME_PREFIX}-cluster --role-arn ${ARN_ROLE}
}
function delete-0-stack-resources {
    # remove ecr
    aws ecr delete-repository --repository-name ${PROJECT_STACK_NAME_PREFIX}-back-api --force
    aws ecr delete-repository --repository-name ${PROJECT_STACK_NAME_PREFIX}-back-queue-worker --force
    aws ecr delete-repository --repository-name ${PROJECT_STACK_NAME_PREFIX}-back-ws --force
    aws ecr delete-repository --repository-name ${PROJECT_STACK_NAME_PREFIX}-front-nginx --force
    # remove s3
    aws s3 rm ${S3_BUCKET_NAME} --recursive
    aws s3 rb ${S3_BUCKET_NAME} --force
}
function delete-0-stack {
    aws cloudformation delete-stack --stack-name ${STACK_NAME} --role-arn ${ARN_ROLE}
}

$COMMAND_NAME $COMMAND_PARAM

echo "FINISH Application Stack @ "`datetime`

exit $ER_OK
