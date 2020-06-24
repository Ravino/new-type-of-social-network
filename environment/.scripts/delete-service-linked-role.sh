#!/bin/bash
SERVICE_NAME="CloudFormation"
if [ ! -z $1 ]; then
    SERVICE_NAME=$1
fi
echo "Deleting service-linked role for service: $SERVICE_NAME"

DELETION_TASK_ID=$(aws iam delete-service-linked-role \
    --role-name ${SERVICE_NAME}.amazonaws.com \
    --query "deletion-task-id")

aws iam get-service-linked-role-deletion-status \
--deletion-task-id $DELETION_TASK_ID

exit 0;
