# configuration
ENV="dev"
STACK_NAME=dev-plizi-fun

# scripts
run:
	docker-compose up -d
create:
	aws cloudformation create-stack --stack-name $(STACK_NAME) \
		--template-body=file://templates/pipeline.yml \
		--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND  \
		--disable-rollback \
		--no-enable-termination-protection
delete:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
purge:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
	aws cloudformation delete-stack --stack-name "$(ENV)-base-resources"
	aws cloudformation delete-stack --stack-name "$(ENV)-chat-resources"
	aws ecr delete-repository --repository-name "$(ENV)-back-api"
	aws ecr delete-repository --repository-name "$(ENV)-back-queue-worker"
	aws ecr delete-repository --repository-name "$(ENV)-back-ws"
	aws ecr delete-repository --repository-name "$(ENV)-front-nginx"
status:
	aws cloudformation describe-stacks --output table
events:
	aws cloudformation describe-stack-events --stack-name $(STACK_NAME)
