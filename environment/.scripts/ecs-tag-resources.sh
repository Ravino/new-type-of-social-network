#!/bin/bash

# $2 = tags list, format: key=...,value=...
function add() {
    aws ecs tag-resource --resource-arn $1 --tags $2
}

# $2 = tag key to remove
function delete() {
    aws ecs untag-resource --resource-arn $1 --tag-keys $2
}

#
function list() {
    aws ecs list-tags-for-resource $1 resource_ARN
}

# $1 = task definition name
# $2 =  tags list, format: key=...,value=...
function copy_from_definition() {
    aws ecs create-service --service-name application --task-definition $1 --tags $2 --propagateTags $3
}

function copy_from_service() {
    aws ecs create-service --service-name application --task-definition $1 --tags key=stack,value=dev --propagateTags Service
}

`$@`

exit 0
