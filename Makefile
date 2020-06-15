run:
	docker-compose up -d
create-stack:
	aws cloudformation create-stack --stack-name plizi-fun --template-body file://templates/pipeline.yml --capabilities CAPABILITY_IAM
delete-stack:
	aws cloudformation delete-stack --stack-name plizi-fun