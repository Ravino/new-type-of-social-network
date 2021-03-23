aws ecs create-service \
     --capacity-provider-strategy capacityProvider=FARGATE,weight=1 capacityProvider=FARGATE_SPOT,weight=1 \
     --cluster FargateCluster \
     --service-name FargateService \
     --task-definition task-def-family:revision \
     --network-configuration "awsvpcConfiguration={subnets=[string,string],securityGroups=[string,string],assignPublicIp=string}" \
     --desired-count integer \
     --region eu-central-1
