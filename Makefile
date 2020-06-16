# configuration
ENV="dev"
STACK_NAME=dev-plizi-fun
USERNAME=admin
TOKEN=Console-CreateStack-988ec83f-9ffc-d8ef-99b7-e8763c8da9c8

# scripts
run:
	docker-compose up -d
create:
	aws cloudformation create-stack --stack-name $(STACK_NAME) \
		--template-body=file://templates/pipeline.yml \
		--parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) \
		--capabilities CAPABILITY_IAM  \
		--disable-rollback \
		--no-enable-termination-protection \
		--client-request-token $(TOKEN)
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
