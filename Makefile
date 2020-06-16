# configuration
ENV="test"
STACK_NAME=test-plizi-fun
USERNAME=admin
TOKEN=/c5e12905-bd91-c060-e794-70e2a80a116e

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
		--client-request-token cea9cf10-afe8-11ea-84ed-0a0c9a06689c
		#StackId": "arn:aws:cloudformation:eu-central-1:884088487044:stack/test-plizi-fun/82bf5740-afe9-11ea-93d6-0a58cd169056"
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
deploy:
	aws cloudformation deploy 
	cea9cf10-afe8-11ea-84ed-0a0c9a06689c
hotfix:
	git commit -a -m "Hotfix deploy" && git push
validate-pipeline:	
	aws cloudformation validate-template --template-body file://templates/pipeline.yml