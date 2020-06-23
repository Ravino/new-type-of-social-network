all:
PROJECT_NAME="plizi"
ENV="dev"
REGION="eu-central-1"
STACK_NAME="plizi"
ARN_ADMIN="arn:aws:iam::884088487044:role/CloudFormationMasterRole"
CLIENT_TOKEN="ClientToken$(REGION)$(STACK_NAME)$(ENV)"

create:
    aws cloudformation create-stack \
    --stack-name $(STACK_NAME) \
    --template-body=file://templates/pipeline.yml \
    --parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) \
    --role-arn $(ARN_ADMIN) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --disable-rollback \
    --no-enable-termination-protection \
    --timeout-in-minutes 60 \
    --client-request-token $(CLIENT_TOKEN)

delete:
    aws cloudformation delete-stack --stack-name $(STACK_FULL_NAME)-mongo --role-arn=$(ARN_ADMIN)
    aws cloudformation delete-stack --stack-name $(STACK_FULL_NAME)-mysql --role-arn=$(ARN_ADMIN)
    aws cloudformation delete-stack --stack-name $(STACK_FULL_NAME)-redis --role-arn=$(ARN_ADMIN)
    aws cloudformation delete-stack --stack-name $(STACK_FULL_NAME)-resources --role-arn=$(ARN_ADMIN)
    aws cloudformation delete-stack --stack-name $(STACK_FULL_NAME)-cluster --role-arn=$(ARN_ADMIN)
    aws cloudformation delete-stack --stack-name $(STACK_NAME) --role-arn=$(ARN_ADMIN)
    aws codebuild delete-project --project-name $(STACK_FULL_NAME)-back-api
    aws codebuild delete-project --project-name $(STACK_FULL_NAME)-back-queue-worker
    aws codebuild delete-project --project-name $(STACK_FULL_NAME)-back-ws
    aws codebuild delete-project --project-name $(STACK_FULL_NAME)-front-nginx
    aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-api
    aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-queue-worker
    aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-back-ws
    aws ecr delete-repository --repository-name $(STACK_FULL_NAME)-front-nginx

update:
    aws cloudformation update-stack \
    --stack-name $(STACK_NAME) \
    --template-body=file://templates/pipeline.yml \
    --parameters ParameterKey=EnvironmentName,ParameterValue=$(ENV) \
    --role-arn $(ARN_ADMIN) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

