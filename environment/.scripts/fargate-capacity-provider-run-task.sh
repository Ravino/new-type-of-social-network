aws ecs run-task \
     --capacity-provider-strategy capacityProvider=FARGATE,weight=1 capacityProvider=FARGATE_SPOT,weight=1 \
     --cluster FargateCluster \
     --task-definition task-def-family:revision \
     --network-configuration "awsvpcConfiguration={subnets=[string,string],securityGroups=[string,string],assignPublicIp=string}" \
     --count integer \
     --region eu-central-1
