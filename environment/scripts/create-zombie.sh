#/bin/bash

ZOMBIE_NAME=test-plizi-fun-CloudFormationDeployRole-NR1IZQOA50QS

aws iam --region eu-central-1 create-role --role-name $ZOMBIE_NAME --assume-role-policy-document file://config/zombie-role-policy.json

exit 0