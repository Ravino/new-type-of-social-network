# configuration
ENV="test"
STACK_NAME=test-plizi-fun
USERNAME=admin
TOKEN=/c5e12905-bd91-c060-e794-70e2a80a116e
ARN_ADMIN=arn:aws:iam::884088487044:role/CloudFormationDeployRole

# scripts
create:
	aws cloudformation create-stack --stack-name test-plizi-fun \
		--template-body=file://templates/pipeline.yml \
		--parameters ParameterKey=EnvironmentName,ParameterValue=test \
		--role-arn $(ARN_ADMIN)
		--capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM \
		--disable-rollback \
		--no-enable-termination-protection \
		--timeout-in-minutes 60
		--client-token 82bf5740-afe9-11ea-93d6-0a58cd169056
		#StackId": "arn:aws:cloudformation:eu-central-1:884088487044:stack/test-plizi-fun/82bf5740-afe9-11ea-93d6-0a58cd169056"
		#StackId": "arn:aws:cloudformation:eu-central-1:884088487044:stack/prod-plizi-fun/f7a0c3c0-b136-11ea-9126-0a1a4d297742"
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
	aws ecr delete-repository --repository-name $(ENV)-back-api
	aws ecr delete-repository --repository-name $(ENV)-back-queue-worker
	aws ecr delete-repository --repository-name $(ENV)-back-ws
	aws ecr delete-repository --repository-name $(ENV)-front-nginx
status:
	aws cloudformation describe-stacks --output table
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