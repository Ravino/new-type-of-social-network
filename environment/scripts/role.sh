#!/bin/bash

# configurations
ENV_FILE_NAME=".env"
MASTER_FILE_NAME="master-role"
ZOMBIE_FILE_NAME="zombie-role"

source './library/stack-iam-role/create.sh'
source './library/stack-iam-role/delete.sh'

# internal methods
function load_configuration() {
    ENV_FILE_NAME="./config/$1.env"
    source $ENV_FILE_NAME
    export ROLE_NAME="${ROLE_NAME_PREFIX}${ROLE_NAME}${ROLE_NAME_POSTFIX}"
    export ROLE_POLICY_NAME="${ROLE_POLICY_NAME_PREFIX}${ROLE_NAME}${ROLE_POLICY_NAME_POSTFIX}"
    export ROLE_ASSUME_POLICY_NAME="${ROLE_ASSUME_POLICY_DIR_PATH}/${ROLE_NAME}"
    export ROLE_DEPLOY_POLICY_NAME="${ROLE_DEPLOY_POLICY_DIR_PATH}/${ROLE_POLICY_NAME}"
}

# functions

# zombie role actions
function create-zombie() {
    load_configuration $ZOMBIE_FILE_NAME
    export ROLE_ASSUME_POLICY_NAME="${ROLE_ASSUME_POLICY_DIR_PATH}/zombie-role"
    export ROLE_DEPLOY_POLICY_NAME="${ROLE_DEPLOY_POLICY_DIR_PATH}/zombie-role-policy"
    echo stack-iam-role-create $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}
function delete-zombie() {
    load_configuration $ZOMBIE_FILE_NAME
    export ROLE_ASSUME_POLICY_NAME="${ROLE_ASSUME_POLICY_DIR_PATH}/zombie-role"
    export ROLE_DEPLOY_POLICY_NAME="${ROLE_DEPLOY_POLICY_DIR_PATH}/zombie-role-policy"
    echo stack-iam-role-delete $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}
function replace-zombie() {
    load_configuration $ZOMBIE_FILE_NAME
    export ROLE_ASSUME_POLICY_NAME="${ROLE_ASSUME_POLICY_DIR_PATH}/zombie-role"
    export ROLE_DEPLOY_POLICY_NAME="${ROLE_DEPLOY_POLICY_DIR_PATH}/zombie-role-policy"
    echo stack-iam-role-delete $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    echo stack-iam-role-create $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}

# master role actions
function create-master() {
    load_configuration $MASTER_FILE_NAME
    echo stack-iam-role-create $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}
function delete-master() {
    load_configuration $MASTER_FILE_NAME
    echo stack-iam-role-delete $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}
function replace-master() {
    load_configuration $MASTER_FILE_NAME
    echo tack-iam-role-create $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    echo stack-iam-role-delete $ROLE_NAME $ROLE_POLICY_NAME $ROLE_ASSUME_POLICY_NAME $ROLE_DEPLOY_POLICY_NAME
    exit 0
}

`$1`

exit 0
