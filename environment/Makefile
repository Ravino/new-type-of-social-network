# configuration
ENV=dev
REGION=eu-central-1
STACK_NAME=plizi
STACK_FULL_NAME=$(REGION)-$(ENV)-$(STACK_NAME)
TOKEN=/c5e12905-bd91-c060-e794-70e2a80a116e
ARN_ADMIN=arn:aws:iam::884088487044:role/CloudFormationRole

# scripts
create:
	aws cloudformation create-stack --stack-name $(STACK_NAME) --template-body=file://templates/pipeline.yml \
	--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) --role-arn $(ARN_ADMIN) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
	--disable-rollback --no-enable-termination-protection --timeout-in-minutes 60
	##--client-token 2746ebb0-b464-11ea-ae72-060cd1f69c1a
delete:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
sudo-delete:
	aws cloudformation delete-stack --stack-name eu-central-1-test-mongo --role-arn $(ARN_ADMIN)
	aws cloudformation delete-stack --stack-name eu-central-1-test-mysql --role-arn $(ARN_ADMIN)
	aws cloudformation delete-stack --stack-name eu-central-1-test-redis --role-arn $(ARN_ADMIN)
	aws cloudformation delete-stack --stack-name eu-central-1-test-resources --role-arn $(ARN_ADMIN)
	aws cloudformation delete-stack --stack-name eu-central-1-test-plizi-fun-cluster --role-arn $(ARN_ADMIN)
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --role-arn $(ARN_ADMIN)
purge:
	aws cloudformation delete-stack --stack-name eu-central-1-test-mongo
	aws cloudformation delete-stack --stack-name eu-central-1-test-mysql
	aws cloudformation delete-stack --stack-name eu-central-1-test-redis
	aws cloudformation delete-stack --stack-name eu-central-1-test-resources
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
delete-repo:
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-api --role-arn $(ARN_ADMIN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-queue-worker --role-arn $(ARN_ADMIN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-ws --role-arn $(ARN_ADMIN)
	aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-front-nginx --role-arn $(ARN_ADMIN)
status:
	aws cloudformation describe-stacks --output table
events:
	aws cloudformation describe-stack-events --stack-name $(STACK_NAME)
deploy:
	aws cloudformation deploy --template-file file://templates/pipeline.yml \
	--stack-name test-plizi-fun --no-fail-on-empty-changeset \
	--parameters ParameterKey=EnvironmentName,ParameterValue=dev \
	--capabilities CAPABILITY_IAM
hotfix:
	git commit -a -m "Hotfix deploy" && git push
unstuck:
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)-base-resources
	 aws cloudformation continue-update-rollback --stack-name $(STACK_NAME)-chat-resources
