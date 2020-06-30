aws ecs list-account-settings --effective-settings --profile root
aws ecs put-account-setting-default --name "containerInsights" --value "enabled" --profile root
aws ecs put-account-setting-default --name "serviceLongArnFormat" --value "enabled" --profile root
aws ecs put-account-setting-default --name "taskLongArnFormat" --value "enabled" --profile root
aws ecs put-account-setting-default --name "containerInstanceLongArnFormat" --value "enabled" --profile root
aws ecs put-account-setting-default --name "awsvpcTrunking" --value "enabled" --profile root
aws ecs list-account-settings --effective-settings --profile root
