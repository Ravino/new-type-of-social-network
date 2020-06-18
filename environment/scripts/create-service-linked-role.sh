aws iam create-role --role-name CodeDeployServiceRole --assume-role-policy-document file://config/code-deploy-trust.json

aws iam put-role-policy --role-name CodeDeployServiceRole --policy-document file://config/code-deploy-policy.json 