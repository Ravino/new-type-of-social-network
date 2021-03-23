#!/bin/bash

function stack-iam-role-delete() {

    if [ -z $ROLE_NAME ]; then
        if [ -z $1 ]; then
            echo "ROLE_NAME is required as \$1 parameter"
            exit 1
        fi
        ROLE_NAME=$1
        echo ">> ROLE_NAME = "$ROLE_NAME
    fi;

    if [ -z $ROLE_POLICY_NAME ]; then
        if [ -z $2 ]; then
            echo "ROLE_POLICY_NAME is required as \$2 parameter"
            exit 1
        fi
        ROLE_NAME=$2
        echo ">> ROLE_POLICY_NAME = "$ROLE_POLICY_NAME
    fi;

    if [ -z $ROLE_ASSUME_POLICY_NAME ]; then
        if [ -z $3 ]; then
            echo "ROLE_ASSUME_POLICY_NAME is required as \$3 parameter"
            exit 1
        fi
        ROLE_ASSUME_POLICY_NAME=$3
        echo ">> ROLE_ASSUME_POLICY_NAME = "$ROLE_ASSUME_POLICY_NAME
    fi;

    if [ -z $ROLE_DEPLOY_POLICY_NAME ]; then
        if [ -z $4 ]; then
            echo "ROLE_DEPLOY_POLICY_NAME is required as \$4 parameter"
            exit 1
        fi
        ROLE_ASSUME_POLICY_NAME=$4
        echo ">> ROLE_DEPLOY_POLICY_NAME = "$ROLE_DEPLOY_POLICY_NAME
    fi;
    
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

}
export -f stack-iam-role-delete