#!/bin/bash

function stack-iam-role-create() {

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
        ROLE_POLICY_NAME=$2
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
        ROLE_DEPLOY_POLICY_NAME=$4
        echo ">> ROLE_DEPLOY_POLICY_NAME = "$ROLE_DEPLOY_POLICY_NAME
    fi;

    CREATED_ROLE_ARN=""
    echo "[5] START Create ${ROLE_NAME} role"
    if [ -f "${ROLE_ASSUME_POLICY_NAME}.json" ]; then
        echo ":: Assume policy file detected ${ROLE_ASSUME_POLICY_NAME}.json"
        echo ">> aws iam create-role --role-name ${ROLE_NAME} \
        --assume-role-policy-document file://${ROLE_ASSUME_POLICY_NAME}.json"
        CREATED_ROLE_ARN=`aws iam create-role --role-name ${ROLE_NAME} \
        --assume-role-policy-document file://${ROLE_ASSUME_POLICY_NAME}.json \
        --query "Role.Arn"`
        echo "CREATED_ROLE_ARN=${CRE_ROLE_ARN}"
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
}
export -f stack-iam-role-create