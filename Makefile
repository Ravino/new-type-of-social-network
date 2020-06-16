# configuration
ENV="prod"
STACK_NAME=prod-plizi-fun

# scripts
run:
	docker-compose up -d
create:
	aws cloudformation create-stack --stack-name $(STACK_NAME) \
		--template-body=file://templates/pipeline.yml \
		--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) \
		--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
		--disable-rollback \
		--no-enable-termination-protection
delete:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
purge:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
	aws ecr delete-repository --repository-name prod-back-api
	aws ecr delete-repository --repository-name prod-back-queue-worker
	aws ecr delete-repository --repository-name prod-back-ws
	aws ecr delete-repository --repository-name prod-front-nginx
status:
	aws cloudformation describe-stacks --output table
events:
	aws cloudformation describe-stack-events --stack-name $(STACK_NAME)
