aws ecs put-cluster-capacity-providers \
     --cluster FargateCluster \
     --capacity-providers FARGATE FARGATE_SPOT existing_capacity_provider1 existing_capacity_provider2 \
     --default-capacity-provider-strategy existing_default_capacity_provider_strategy \
     --region eu-central-1
