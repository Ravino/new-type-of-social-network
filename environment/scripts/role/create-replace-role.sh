#!/bin/bash
# NB! list-policies-granting-service-access - in case of creation of trust role

CONFIG_PATH="./create-replace-role.config"
if [ -f ${CONFIG_PATH} ]; then
    echo ":: Found config file ${CONFIG_PATH}, sourcing..."
    source ${CONFIG_PATH}
else
    echo "ERROR: Can'f find config file ${CONFIG_PATH}"
    exit 10;
fi

# parser input
# echo "[1] START Parse Input"
# if [ -z "$1" ]; then
#     INPUT_ROLE="CloudFormation"
#     echo ":: ROLE_NAME argument is not specified, INPUT_ROLE = ${INPUT_ROLE}"
# else
#     INPUT_ROLE=$1""
#     echo ":: ROLE_NAME argument specified $1, INPUT_ROLE = ${INPUT_ROLE}"
# fi

# if [ -z "$2" ]; then
#     STACK_NAME="CloudFormation"
#     echo ":: ROLE_NAME argument is not specified, STACK_NAME = ${STACK_NAME}"
# else
#     STACK_NAME=$12""
#     echo ":: ROLE_NAME argument specified $2, STACK_NAME = ${STACK_NAME}"
# fi
# echo "[1] FINISH Parse Input"

echo "[2] START Make Variables"
# make variables
ROLE_NAME="${ROLE_NAME_PREFIX}${STACK_IAM_ROLE}${ROLE_NAME_POSTFIX}"    #ROLE_NAME="{INPUT_ROLE}"DeployRole/${STACK_NAME}"
echo "ROLE_NAME=${ROLE_NAME}"
ROLE_POLICY_NAME=${ROLE_NAME}"${ROLE_POLICY_NAME_POSTIX}"
echo "ROLE_POLICY_NAME=${ROLE_POLICY_NAME}"
ROLE_ASSUME_POLICY_NAME="assume-role-policy/${STACK_IAM_ROLE}"
echo "ROLE_ASSUME_POLICY_NAME=${ROLE_ASSUME_POLICY_NAME}"
ROLE_DEPLOY_POLICY_NAME="deploy-role-policy/${STACK_IAM_ROLE}"
echo "ROLE_DEPLOY_POLICY_NAME=${ROLE_DEPLOY_POLICY_NAME}"
echo "[2] FINISH Parse Input"

echo "[3] START Check Roles Count ${ROLE_NAME} role"
echo "aws iam list-roles --no-paginate --query \"Roles[?RoleName=='${ROLE_NAME}'] | length(@)\""
COUNT_DEL_ROLES=`aws iam list-roles --no-paginate --query "Roles[?RoleName=='${ROLE_NAME}'] | length(@)"`
echo "COUNT_DEL_ROLES=${COUNT_DEL_ROLES}"
echo "[3] FINISH Check Roles Count ${ROLE_NAME} role"

echo "[4] START Delete ${ROLE_NAME} role"
if [ $COUNT_DEL_ROLES -eq "0" ]; then
    echo ":: No roles with role-name ${ROLE_NAME} found, skipping delete."
elif [ $COUNT_DEL_ROLES -eq "1" ]; then
    echo ":: Removing role policies from old role ${ROLE_NAME}"

    echo ">> aws iam list-attached-role-policies \
        --role-name ${ROLE_NAME} --query=\"AttachedPolicies[].PolicyArn\ | length(@)\""
    COUNT_DEL_ROLE_POLICIES=`aws iam list-attached-role-policies \
        --role-name ${ROLE_NAME} --query="AttachedPolicies[].PolicyArn | length(@)"`
    echo "COUNT_DEL_ROLE_POLICIES=${COUNT_DEL_ROLE_POLICIES}"

    if [ $COUNT_DEL_ROLE_POLICIES -eq "0" ]; then
        echo ":: No role-policiess with role-name ${COUNT_DEL_ROLE_POLICIES} found, skipping delete."
    elif [ $COUNT_DEL_ROLE_POLICIES -eq "1" ]; then
        echo ":: Removing role policies from old role ${ROLE_NAME}"

        echo ">> aws iam list-attached-role-policies \
            --role-name ${ROLE_NAME} --query=\"AttachedPolicies[0].PolicyArn\" | tr -d '\"'"
        DEL_DEPLOY_POLICY_ARN=`aws iam list-attached-role-policies \
            --role-name ${ROLE_NAME} --query="AttachedPolicies[0].PolicyArn" | tr -d '"'`
        echo "DEL_DEPLOY_POLICY_ARN=${DEL_DEPLOY_POLICY_ARN}"

        # remove old role
        if [ -z DEL_DEPLOY_POLICY_ARN ]; then
            echo ":: No DEL_DEPLOY_POLICY_ARN specified, skipping delete."
        else
            echo ">> aws iam detach-role-policy \
            --role-name ${ROLE_NAME} \
            --policy-arn ${DEL_DEPLOY_POLICY_ARN}"
            aws iam detach-role-policy \
            --role-name ${ROLE_NAME} \
            --policy-arn ${DEL_DEPLOY_POLICY_ARN}
        fi
    else
        echo "ERROR: Have more then ${COUNT_DEL_ROLE_POLICIES} != \"1\" role-policies for delete for role ${ROLE_NAME} - consider delete manually"
        exit 10;
    fi

    echo ">> aws iam delete-role --role-name ${ROLE_NAME}"
    aws iam delete-role --role-name ${ROLE_NAME}
else
    echo "ERROR: Have more then ${COUNT_DEL_ROLES} != \"1\" role for delete ${ROLE_NAME} - consider delete manually"
    exit 10;
fi
echo "[4] START Delete ${ROLE_NAME} role"

CRE_ROLE_ARN=""
echo "[5] START Create ${ROLE_NAME} role"
if [ -f "${ROLE_ASSUME_POLICY_NAME}.json" ]; then
    echo ":: Assume policy file detected ${ROLE_ASSUME_POLICY_NAME}.json"
    echo ">> aws iam create-role --role-name ${ROLE_NAME} \
    --assume-role-policy-document file://${ROLE_ASSUME_POLICY_NAME}.json"
    CRE_ROLE_ARN=`aws iam create-role --role-name ${ROLE_NAME} \
    --assume-role-policy-document file://${ROLE_ASSUME_POLICY_NAME}.json \
    --query "Role.Arn"`
    echo "CRE_ROLE_ARN=${CRE_ROLE_ARN}"
else
    echo "ERROR: Not found assume policy: ${ROLE_ASSUME_POLICY_NAME}.json"
    exit 20;
fi

if [ -f "${ROLE_DEPLOY_POLICY_NAME}.json" ]; then
    echo ":: Deploy policy file detected ${ROLE_DEPLOY_POLICY_NAME}.json"
    echo ">> aws iam put-role-policy --role-name ${ROLE_NAME} \
    --policy-name ${ROLE_POLICY_NAME} \
    --policy-document file://${ROLE_DEPLOY_POLICY_NAME}.json"
    aws iam put-role-policy --role-name ${ROLE_NAME} \
    --policy-name ${ROLE_POLICY_NAME} \
    --policy-document file://${ROLE_DEPLOY_POLICY_NAME}.json
else
    echo "ERROR: Not found deploy policy: ${ROLE_DEPLOY_POLICY_NAME}.json"
    exit 30;
fi

echo "[5] FINISH Create ${ROLE_NAME} role"

echo "[6] OUTPUT: role now can be used with --role-arn ${CRE_ROLE_ARN} "

exit 0
