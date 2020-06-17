#!/bin/bash

echo "START create cloudformation role"

echo ">> aws iam create-role --role-name CloudFormationStartupRole \
 --assume-role-policy-document file://config/any-assume-role-policy.json"
aws iam create-role --role-name CloudFormationStartupRole \
 --assume-role-policy-document file://config/any-assume-role-policy.json

echo ">>> aws iam put-role-policy --role-name CloudFormationStartupRole --policy-name CloudFormationStartupPolicy \
 --policy-document file://config/cloudformation-deploy-role-policy-document.json"

aws iam put-role-policy --role-name CloudFormationStartupRole --policy-name CloudFormationStartupPolicy \
 --policy-document file://config/cloudformation-deploy-role-policy-document.json

echo "FINISH create cloudformation role"
echo "FINISH role now can be used with --role-arn param"

exit 0