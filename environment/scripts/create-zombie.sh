#/bin/bash

ZOMBIE_NAME=test-plizi-fun-CloudFormationDeployRole-1PM0KUABGZDCB

aws iam --region eu-central-1 create-role --role-name $ZOMBIE_NAME --assume-role-policy-document file://config/zombie-role-policy.json

exit 0