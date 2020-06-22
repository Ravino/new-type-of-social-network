# configuration
ENV=dev
REGION=eu-central-1
STACK_NAME=plizi
STACK_FULL_NAME=$(REGION)-$(ENV)-$(STACK_NAME)
CLIENT_TOKEN="ClientRequestToken1"
ARN_ADMIN=arn:aws:iam::884088487044:role/CloudFormationMasterRole

#--client-token $(CLIENT_TOKEN)
# scripts
create:
	aws cloudformation create-stack --stack-name $(STACK_NAME) --template-body=file://templates/pipeline.yml \
	--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) --role-arn $(ARN_ADMIN) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
	--disable-rollback --no-enable-termination-protection --timeout-in-minutes 60 \
    --client-request-token $(CLIENT_TOKEN)
delete:
	echo "aws cloudformation delete-stack --stack-name $(STACK_NAME) --client-request-token $(CLIENT_TOKEN)"
purge:
	aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-mongo --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-mysql --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-redis --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-resources --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
    aws cloudformation delete-stack --stack-name ${STACK_FULL_NAME}-cluster --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-api --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-queue-worker --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-ws --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-front-nginx --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
update:
	aws cloudformation update-stack --stack-name $(STACK_NAME) --template-body=file://templates/pipeline.yml \
	--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) --role-arn $(ARN_ADMIN) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
status:
	aws cloudformation describe-stacks --output table --role-arn $(ARN_ADMIN) --client-request-token $(CLIENT_TOKEN)
events:
	aws cloudformation describe-stack-events --stack-name $(STACK_NAME)
deploy:
	aws cloudformation deploy --template-file file://templates/pipeline.yml \
	--stack-name test-plizi-fun --no-fail-on-empty-changeset \
	--parameters ParameterKey=EnvironmentName,ParameterValue=dev \
	--capabilities CAPABILITY_NAMED_IAM
hotfix:
	git commit -a -m "Hotfix deploy" && git push
unstuck:
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)-base-resources
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)-chat-resources
