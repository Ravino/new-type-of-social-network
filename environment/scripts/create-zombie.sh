#/bin/bash

ZOMBIE_NAME=plizi-CloudFormationDeployRole-ZP09DUL8X78K

aws iam --region eu-central-1 create-role --role-name $ZOMBIE_NAME --assume-role-policy-document file://create-zombie-assume.json

exit 0
